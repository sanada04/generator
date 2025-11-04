// SSI代替機能 - GitHub Pages対応
// SSIコメントを検出して、対応するHTMLファイルを動的に読み込む

(function() {
    'use strict';

    // 現在のページの階層レベルを取得
    function getDepth() {
        const path = window.location.pathname;
        // ルートページ（index.html）の場合は0
        if (path === '/' || path === '/index.html' || path.match(/^\/en\/?$/)) {
            return 0;
        }
        // パスの階層をカウント（末尾のスラッシュを除く）
        const pathParts = path.replace(/\/$/, '').split('/').filter(p => p && p !== 'index.html');
        // ルートとenディレクトリを除外
        return pathParts.length > 1 ? pathParts.length - 1 : 1;
    }

    // インクルードファイルのパスを生成
    function getIncludePath(includePath) {
        const depth = getDepth();
        const prefix = depth > 0 ? '../'.repeat(depth) : './';
        return prefix + includePath;
    }

    // HTMLファイルを読み込んでDOMに挿入
    async function loadInclude(commentNode, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            
            // 一時的なコンテナを作成
            const tempContainer = document.createElement('div');
            tempContainer.style.display = 'none';
            tempContainer.innerHTML = html;
            
            // スクリプトタグを収集（後で再実行するため）
            const scripts = Array.from(tempContainer.querySelectorAll('script')).map(script => {
                return {
                    src: script.src,
                    async: script.async,
                    defer: script.defer,
                    type: script.type,
                    text: script.textContent,
                    attributes: Array.from(script.attributes).map(attr => ({
                        name: attr.name,
                        value: attr.value
                    }))
                };
            });
            
            // コメントノードの後に一時コンテナを挿入
            const parent = commentNode.parentNode;
            parent.insertBefore(tempContainer, commentNode.nextSibling);
            
            // 一時コンテナの子要素をコメントノードの位置に移動
            const fragment = document.createDocumentFragment();
            while (tempContainer.firstChild) {
                fragment.appendChild(tempContainer.firstChild);
            }
            
            // コメントノードをフラグメントに置き換え
            parent.replaceChild(fragment, commentNode);
            
            // 一時コンテナを削除
            if (tempContainer.parentNode) {
                tempContainer.parentNode.removeChild(tempContainer);
            }
            
            // スクリプトタグを再実行
            scripts.forEach(scriptData => {
                const newScript = document.createElement('script');
                scriptData.attributes.forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                if (scriptData.text) {
                    newScript.textContent = scriptData.text;
                }
                // スクリプトを挿入（実行される）
                document.head.appendChild(newScript);
            });
            
            // 広告スクリプトを再実行（AdSense用）
            if (window.adsbygoogle) {
                setTimeout(() => {
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.warn('AdSense push failed:', e);
                    }
                }, 100);
            }
            
            return true;
        } catch (error) {
            console.error(`Failed to load include: ${filePath}`, error);
            return false;
        }
    }

    // SSIコメントを検出して処理
    function processSSIComments() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_COMMENT,
            null,
            false
        );

        const comments = [];
        let node;
        while (node = walker.nextNode()) {
            const commentText = node.textContent.trim();
            // SSIコメントを検出
            const match = commentText.match(/<!--#include\s+virtual=["']([^"']+)["']\s*-->/i);
            if (match) {
                comments.push({
                    node: node,
                    path: match[1]
                });
            }
        }

        // 各SSIコメントを処理
        const promises = comments.map(({ node, path }) => {
            const includePath = getIncludePath(path);
            return loadInclude(node, includePath);
        });

        return Promise.all(promises);
    }

    // DOMContentLoaded時に実行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processSSIComments);
    } else {
        // 既に読み込み済みの場合は即座に実行
        processSSIComments();
    }
})();
