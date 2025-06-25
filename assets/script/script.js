// JavaScriptファイル読み込み確認
console.log('script.js: ファイル読み込み開始');

// グローバル変数
let currentTab = 'gradient';

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOMContentLoaded: 初期化開始');
        
        // ページタイプを判定
        const isMainPage = !document.querySelector('.tab-button');
        console.log('ページタイプ:', isMainPage ? 'メインページ' : 'ジェネレーターページ');
        
        if (!isMainPage) {
            // ジェネレーターページの場合
            console.log('ジェネレーター初期化開始');
            initializeTabs();
            initializeGenerators();
            console.log('ジェネレーター初期化完了');
        }
        
        console.log('DOMContentLoaded: アフィリエイトモーダル初期化開始');
        initializeAffiliateModal();
        console.log('DOMContentLoaded: 初期化完了');
    } catch (error) {
        console.error('初期化エラー:', error);
    }
});

// タブ切り替え機能
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // アクティブタブを切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            currentTab = targetTab;

            // CSS Gridタブがアクティブになった時にグリッドラインを再描画
            if (targetTab === 'css-grid') {
                requestAnimationFrame(() => {
                    const updateCellLabels = window.gridUpdateCellLabels;
                    if (updateCellLabels) {
                        updateCellLabels();
                    }
                });
            }
        });
    });
}

// 各ジェネレーターの初期化
function initializeGenerators() {
    initializeGradientGenerator();
    initializeBoxShadowGenerator();
    initializeBorderRadiusGenerator();
    initializeFlexboxGenerator();
    initializeTextShadowGenerator();
    initializeTransformGenerator();
    initializeCSSGridGenerator();
    initializeMarginPaddingGenerator();
}

// グラデーションジェネレーター
function initializeGradientGenerator() {
    const type = document.getElementById('gradient-type');
    const angle = document.getElementById('gradient-angle');
    const color1 = document.getElementById('gradient-color1');
    const color2 = document.getElementById('gradient-color2');
    const width = document.getElementById('gradient-width');
    const height = document.getElementById('gradient-height');
    const preview = document.getElementById('gradient-preview');
    const output = document.getElementById('gradient-output');

    // 値表示用の要素
    const widthValue = document.getElementById('gradient-width-value');
    const heightValue = document.getElementById('gradient-height-value');

    function updateGradient() {
        const gradientType = type.value;
        const gradientAngle = angle.value;
        const gradientColor1 = color1.value;
        const gradientColor2 = color2.value;
        const gradientWidth = width.value;
        const gradientHeight = height.value;

        // サイズ値を表示
        widthValue.textContent = `${gradientWidth}px`;
        heightValue.textContent = `${gradientHeight}px`;

        let cssValue;
        if (gradientType === 'linear') {
            cssValue = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;
        } else {
            cssValue = `radial-gradient(circle, ${gradientColor1}, ${gradientColor2})`;
        }

        preview.style.background = cssValue;
        preview.style.width = `${gradientWidth}px`;
        preview.style.height = `${gradientHeight}px`;
        output.value = `background: ${cssValue};`;
    }

    [type, angle, color1, color2, width, height].forEach(element => {
        element.addEventListener('input', updateGradient);
    });

    updateGradient();
}

// ボックスシャドウジェネレーター
function initializeBoxShadowGenerator() {
    const shadowX = document.getElementById('shadow-x');
    const shadowY = document.getElementById('shadow-y');
    const shadowBlur = document.getElementById('shadow-blur');
    const shadowSpread = document.getElementById('shadow-spread');
    const shadowColor = document.getElementById('shadow-color');
    const shadowOpacity = document.getElementById('shadow-opacity');
    const shadowInset = document.getElementById('shadow-inset');
    const width = document.getElementById('shadow-width');
    const height = document.getElementById('shadow-height');
    const preview = document.getElementById('shadow-preview');
    const output = document.getElementById('shadow-output');

    // 値表示用の要素
    const xValue = document.getElementById('shadow-x-value');
    const yValue = document.getElementById('shadow-y-value');
    const blurValue = document.getElementById('shadow-blur-value');
    const spreadValue = document.getElementById('shadow-spread-value');
    const opacityValue = document.getElementById('shadow-opacity-value');
    const widthValue = document.getElementById('shadow-width-value');
    const heightValue = document.getElementById('shadow-height-value');

    function updateBoxShadow() {
        const x = shadowX.value;
        const y = shadowY.value;
        const blur = shadowBlur.value;
        const spread = shadowSpread.value;
        const color = shadowColor.value;
        const opacity = shadowOpacity.value / 100;
        const inset = shadowInset.checked ? 'inset ' : '';
        const shadowWidth = width.value;
        const shadowHeight = height.value;

        // 値を表示
        xValue.textContent = `${x}px`;
        yValue.textContent = `${y}px`;
        blurValue.textContent = `${blur}px`;
        spreadValue.textContent = `${spread}px`;
        opacityValue.textContent = `${shadowOpacity.value}%`;
        widthValue.textContent = `${shadowWidth}px`;
        heightValue.textContent = `${shadowHeight}px`;

        // カラーをRGBAに変換
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        const cssValue = `${inset}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;

        preview.style.boxShadow = cssValue;
        preview.style.width = `${shadowWidth}px`;
        preview.style.height = `${shadowHeight}px`;
        output.value = `box-shadow: ${cssValue};`;
    }

    [shadowX, shadowY, shadowBlur, shadowSpread, shadowColor, shadowOpacity, shadowInset, width, height].forEach(element => {
        element.addEventListener('input', updateBoxShadow);
    });

    updateBoxShadow();
}

// ボーダーラジアスジェネレーター
function initializeBorderRadiusGenerator() {
    const radiusTL = document.getElementById('radius-tl');
    const radiusTR = document.getElementById('radius-tr');
    const radiusBR = document.getElementById('radius-br');
    const radiusBL = document.getElementById('radius-bl');
    const syncButton = document.getElementById('sync-radius');
    const width = document.getElementById('radius-width');
    const height = document.getElementById('radius-height');
    const preview = document.getElementById('radius-preview');
    const output = document.getElementById('radius-output');

    // 値表示用の要素
    const tlValue = document.getElementById('radius-tl-value');
    const trValue = document.getElementById('radius-tr-value');
    const brValue = document.getElementById('radius-br-value');
    const blValue = document.getElementById('radius-bl-value');
    const widthValue = document.getElementById('radius-width-value');
    const heightValue = document.getElementById('radius-height-value');

    function updateBorderRadius() {
        const tl = radiusTL.value;
        const tr = radiusTR.value;
        const br = radiusBR.value;
        const bl = radiusBL.value;
        const radiusWidth = width.value;
        const radiusHeight = height.value;

        // 値を表示
        tlValue.textContent = `${tl}px`;
        trValue.textContent = `${tr}px`;
        brValue.textContent = `${br}px`;
        blValue.textContent = `${bl}px`;
        widthValue.textContent = `${radiusWidth}px`;
        heightValue.textContent = `${radiusHeight}px`;

        const cssValue = `${tl}px ${tr}px ${br}px ${bl}px`;

        preview.style.borderRadius = cssValue;
        preview.style.width = `${radiusWidth}px`;
        preview.style.height = `${radiusHeight}px`;
        output.value = `border-radius: ${cssValue};`;
    }

    // 同期ボタン
    syncButton.addEventListener('click', () => {
        const value = radiusTL.value;
        radiusTR.value = value;
        radiusBR.value = value;
        radiusBL.value = value;
        updateBorderRadius();
    });

    [radiusTL, radiusTR, radiusBR, radiusBL, width, height].forEach(element => {
        element.addEventListener('input', updateBorderRadius);
    });

    updateBorderRadius();
}

// フレックスボックスジェネレーター
function initializeFlexboxGenerator() {
    const flexDirection = document.getElementById('flex-direction');
    const flexWrap = document.getElementById('flex-wrap');
    const justifyContent = document.getElementById('justify-content');
    const alignItems = document.getElementById('align-items');
    const alignContent = document.getElementById('align-content');
    const flexGap = document.getElementById('flex-gap');
    const preview = document.getElementById('flex-preview');
    const output = document.getElementById('flex-output');

    // 値表示用の要素
    const gapValue = document.getElementById('flex-gap-value');

    function updateFlexbox() {
        const direction = flexDirection ? flexDirection.value : 'row';
        const wrap = flexWrap ? flexWrap.value : 'nowrap';
        const justify = justifyContent ? justifyContent.value : 'flex-start';
        const align = alignItems ? alignItems.value : 'stretch';
        const alignCont = alignContent ? alignContent.value : 'stretch';
        const gap = flexGap ? flexGap.value : '10';

        // 値を表示
        if (gapValue) gapValue.textContent = `${gap}px`;

        // プレビューに適用
        if (preview) {
            preview.style.flexDirection = direction;
            preview.style.flexWrap = wrap;
            preview.style.justifyContent = justify;
            preview.style.alignItems = align;
            preview.style.alignContent = alignCont;
            preview.style.gap = `${gap}px`;
        }

        // CSS出力
        const cssValue = `display: flex;
flex-direction: ${direction};
flex-wrap: ${wrap};
justify-content: ${justify};
align-items: ${align};
align-content: ${alignCont};
gap: ${gap}px;`;

        if (output) output.value = cssValue;
    }

    // 存在する要素のみイベントリスナーを追加
    [flexDirection, flexWrap, justifyContent, alignItems, alignContent, flexGap].forEach(element => {
        if (element) {
            element.addEventListener('input', updateFlexbox);
        }
    });

    updateFlexbox();
}

// テキストシャドウジェネレーター
function initializeTextShadowGenerator() {
    const textShadowX = document.getElementById('text-shadow-x');
    const textShadowY = document.getElementById('text-shadow-y');
    const textShadowBlur = document.getElementById('text-shadow-blur');
    const textShadowColor = document.getElementById('text-shadow-color');
    const textShadowOpacity = document.getElementById('text-shadow-opacity');
    const textColor = document.getElementById('text-color');
    const textSize = document.getElementById('text-size');
    const preview = document.getElementById('text-shadow-preview');
    const output = document.getElementById('text-shadow-output');

    // 値表示用の要素
    const xValue = document.getElementById('text-shadow-x-value');
    const yValue = document.getElementById('text-shadow-y-value');
    const blurValue = document.getElementById('text-shadow-blur-value');
    const opacityValue = document.getElementById('text-shadow-opacity-value');
    const sizeValue = document.getElementById('text-size-value');

    function updateTextShadow() {
        if (!textShadowX || !textShadowY || !textShadowBlur || !textShadowColor || !textShadowOpacity || !textColor || !textSize || !preview || !output) {
            console.error('テキストシャドウジェネレーターの要素が見つかりません');
            return;
        }

        const x = textShadowX.value;
        const y = textShadowY.value;
        const blur = textShadowBlur.value;
        const color = textShadowColor.value;
        const opacity = textShadowOpacity.value / 100;
        const fontSize = textSize.value;
        const textColorValue = textColor.value;

        // 値を表示
        if (xValue) xValue.textContent = `${x}px`;
        if (yValue) yValue.textContent = `${y}px`;
        if (blurValue) blurValue.textContent = `${blur}px`;
        if (opacityValue) opacityValue.textContent = `${textShadowOpacity.value}%`;
        if (sizeValue) sizeValue.textContent = `${fontSize}px`;

        // カラーをRGBAに変換
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        const cssValue = `${x}px ${y}px ${blur}px ${rgba}`;

        preview.style.textShadow = cssValue;
        preview.style.fontSize = `${fontSize}px`;
        preview.style.color = textColorValue;
        output.value = `text-shadow: ${cssValue};`;
    }

    // 存在する要素のみイベントリスナーを追加
    [textShadowX, textShadowY, textShadowBlur, textShadowColor, textShadowOpacity, textColor, textSize].forEach(element => {
        if (element) {
            element.addEventListener('input', updateTextShadow);
        }
    });

    updateTextShadow();
}

// トランスフォームジェネレーター
function initializeTransformGenerator() {
    const transformRotate = document.getElementById('transform-rotate');
    const transformScaleX = document.getElementById('transform-scale-x');
    const transformScaleY = document.getElementById('transform-scale-y');
    const transformTranslateX = document.getElementById('transform-translate-x');
    const transformTranslateY = document.getElementById('transform-translate-y');
    const transformSkewX = document.getElementById('transform-skew-x');
    const transformSkewY = document.getElementById('transform-skew-y');
    const transformWidth = document.getElementById('transform-width');
    const transformHeight = document.getElementById('transform-height');
    const transformOrigin = document.getElementById('transform-origin');
    const preview = document.getElementById('transform-preview');
    const output = document.getElementById('transform-output');
    const resetBtn = document.getElementById('reset-transform');
    const presetBtns = document.querySelectorAll('.preset-btn');

    // 必要な要素が存在しない場合は処理を中断
    if (!transformRotate || !transformScaleX || !transformScaleY || !transformTranslateX || 
        !transformTranslateY || !transformSkewX || !transformSkewY || !preview || !output) {
        console.warn('Transform Generator: Required elements not found');
        return;
    }

    // 値表示用の要素
    const rotateValue = document.getElementById('transform-rotate-value');
    const scaleXValue = document.getElementById('transform-scale-x-value');
    const scaleYValue = document.getElementById('transform-scale-y-value');
    const translateXValue = document.getElementById('transform-translate-x-value');
    const translateYValue = document.getElementById('transform-translate-y-value');
    const skewXValue = document.getElementById('transform-skew-x-value');
    const skewYValue = document.getElementById('transform-skew-y-value');
    const widthValue = document.getElementById('transform-width-value');
    const heightValue = document.getElementById('transform-height-value');

    function updateTransform() {
        const rotate = transformRotate.value;
        const scaleX = transformScaleX.value;
        const scaleY = transformScaleY.value;
        const translateX = transformTranslateX.value;
        const translateY = transformTranslateY.value;
        const skewX = transformSkewX.value;
        const skewY = transformSkewY.value;
        const width = transformWidth ? transformWidth.value : 120;
        const height = transformHeight ? transformHeight.value : 120;
        const origin = transformOrigin ? transformOrigin.value : 'center center';

        // 値を表示（要素が存在する場合のみ）
        if (rotateValue) rotateValue.textContent = `${rotate}deg`;
        if (scaleXValue) scaleXValue.textContent = scaleX;
        if (scaleYValue) scaleYValue.textContent = scaleY;
        if (translateXValue) translateXValue.textContent = `${translateX}px`;
        if (translateYValue) translateYValue.textContent = `${translateY}px`;
        if (skewXValue) skewXValue.textContent = `${skewX}deg`;
        if (skewYValue) skewYValue.textContent = `${skewY}deg`;
        if (widthValue) widthValue.textContent = `${width}px`;
        if (heightValue) heightValue.textContent = `${height}px`;

        const cssValue = `rotate(${rotate}deg) scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`;

        // プレビューボックスを取得（.transform-preview-box要素）
        const transformBox = document.getElementById('preview-element');
        if (transformBox) {
            transformBox.style.transform = cssValue;
            transformBox.style.transformOrigin = origin;
            transformBox.style.width = `${width}px`;
            transformBox.style.height = `${height}px`;
        }

        // プレビューコンテナのdata-origin属性を更新（視覚的な基点表示用）
        const transformPreview = document.getElementById('transform-preview');
        if (transformPreview) {
            transformPreview.setAttribute('data-origin', origin);
        }

        // CSSコードを生成（transform-originも含める）
        let cssOutput = `transform: ${cssValue};`;
        if (origin !== 'center center') {
            cssOutput += `\ntransform-origin: ${origin};`;
        }
        output.value = cssOutput;
    }

    function resetTransform() {
        // すべての値をデフォルトにリセット
        transformRotate.value = 0;
        transformScaleX.value = 1;
        transformScaleY.value = 1;
        transformTranslateX.value = 0;
        transformTranslateY.value = 0;
        transformSkewX.value = 0;
        transformSkewY.value = 0;
        if (transformWidth) transformWidth.value = 120;
        if (transformHeight) transformHeight.value = 120;
        if (transformOrigin) transformOrigin.value = 'center center';

        // プレビューを更新
        updateTransform();

        console.log('トランスフォームをリセットしました');
    }

    function applyPreset(presetType) {
        // まずリセット
        resetTransform();

        // プリセットに応じて値を設定
        switch(presetType) {
            case 'rotate':
                transformRotate.value = 45;
                break;
            case 'scale':
                transformScaleX.value = 1.5;
                transformScaleY.value = 1.5;
                break;
            case 'translate':
                transformTranslateX.value = 30;
                transformTranslateY.value = -20;
                break;
            case 'skew':
                transformSkewX.value = 15;
                transformSkewY.value = -10;
                break;
        }

        // プレビューを更新
        updateTransform();

        console.log(`プリセット「${presetType}」を適用しました`);
    }

    // イベントリスナーを設定（存在する要素のみ）
    const allInputs = [transformRotate, transformScaleX, transformScaleY, transformTranslateX, transformTranslateY, transformSkewX, transformSkewY];
    if (transformWidth) allInputs.push(transformWidth);
    if (transformHeight) allInputs.push(transformHeight);
    if (transformOrigin) allInputs.push(transformOrigin);

    allInputs.forEach(element => {
        if (element) {
            element.addEventListener('input', updateTransform);
        }
    });

    // リセットボタンのイベントリスナー
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTransform);
    }

    // プリセットボタンのイベントリスナー
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const presetType = btn.dataset.preset;
            applyPreset(presetType);
        });
    });

    // Origin Selectorのイベントリスナー
    const originButtons = document.querySelectorAll('.origin-btn');
    originButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // すべてのボタンからactiveクラスを削除
            originButtons.forEach(b => b.classList.remove('active'));
            // クリックされたボタンにactiveクラスを追加
            btn.classList.add('active');

            // 隠れたselectの値を更新
            const originValue = btn.dataset.origin;
            if (transformOrigin) {
                transformOrigin.value = originValue;
            }

            // プレビューを更新
            updateTransform();
        });
    });

    // 初期化
    updateTransform();
    console.log('トランスフォームジェネレーター初期化完了');
}



// クリップボードにコピー
function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    textarea.setSelectionRange(0, 99999); // モバイル対応

    try {
        document.execCommand('copy');
        showNotification('CSSコードをクリップボードにコピーしました！');
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        showNotification('コピーに失敗しました。手動でコードを選択してコピーしてください。', 'error');
    }
}

// 通知表示
function showNotification(message, type = 'success') {
    // 既存の通知があれば削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // スタイルを設定
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    // CSSアニメーションを追加
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // 3秒後に自動削除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// CSS Gridジェネレーター
function initializeCSSGridGenerator() {
    let gridItems = [];
    let selectedItem = null;
    let itemCounter = 1;
    let isDragging = false;
    let isResizing = false;
    let dragStartPos = { x: 0, y: 0 };
    let resizeStartPos = { x: 0, y: 0 };
    let originalArea = '';

    const columnsInput = document.getElementById('grid-columns');
    const rowsInput = document.getElementById('grid-rows');
    const gapInput = document.getElementById('grid-gap');
    const gridContainer = document.getElementById('grid-preview');
    const cssOutput = document.getElementById('grid-css-output');
    const htmlOutput = document.getElementById('grid-html-output');
    const selectedInfo = document.getElementById('selected-item-info');

    // 必要な要素が存在しない場合は処理を中断
    if (!columnsInput || !rowsInput || !gapInput || !gridContainer || !cssOutput || !htmlOutput) {
        console.warn('CSS Grid Generator: Required elements not found');
        return;
    }

    // 値表示用の要素
    const columnsValue = document.getElementById('grid-columns-value');
    const rowsValue = document.getElementById('grid-rows-value');
    const gapValue = document.getElementById('grid-gap-value');

    function updateGrid() {
        const columns = columnsInput.value;
        const rows = rowsInput.value;
        const gap = gapInput.value;

        // 値を表示（要素が存在する場合のみ）
        if (columnsValue) columnsValue.textContent = columns;
        if (rowsValue) rowsValue.textContent = rows;
        if (gapValue) gapValue.textContent = `${gap}px`;

        // グリッドコンテナのスタイルを更新（プレビューは100%固定）
        gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gridContainer.style.gap = `${gap}px`;

        // CSS変数でグリッドライン用の列数・行数・ギャップを設定
        gridContainer.style.setProperty('--grid-columns', columns);
        gridContainer.style.setProperty('--grid-rows', rows);
        gridContainer.style.setProperty('--grid-gap', `${gap}px`);

        // セル番号ラベルを更新（レイアウト確定後に実行）
        requestAnimationFrame(() => {
            setTimeout(() => {
                updateCellLabels();
            }, 10);
        });

        generateCode();
    }

    function updateCellLabels() {
        // 既存のラベルとグリッドラインを削除
        gridContainer.querySelectorAll('.grid-cell-label, .grid-line').forEach(element => {
            element.remove();
        });

        const columns = parseInt(columnsInput.value);
        const rows = parseInt(rowsInput.value);
        const gap = parseInt(gapInput.value);

        // グリッドラインを描画
        createGridLines(columns, rows, gap);

        // 各セルにラベルを追加
        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns; col++) {
                const label = document.createElement('div');
                label.className = 'grid-cell-label';
                label.textContent = `${row},${col}`;
                label.style.gridArea = `${row} / ${col} / ${row + 1} / ${col + 1}`;

                // アイテムがあるセルかチェック
                const hasItem = gridItems.some(item => {
                    const [rowStart, colStart, rowEnd, colEnd] = item.gridArea.split(' / ').map(Number);
                    return row >= rowStart && row < rowEnd && col >= colStart && col < colEnd;
                });

                if (hasItem) {
                    label.style.opacity = '0.3';
                }

                gridContainer.appendChild(label);
            }
        }
    }

    function createGridLines(columns, rows, gap) {
        const containerRect = gridContainer.getBoundingClientRect();
        const availableWidth = containerRect.width - 40; // パディング20px x 2
        const availableHeight = containerRect.height - 40; // パディング20px x 2

        // コンテナサイズが確定していない場合は少し待ってから再実行
        if (availableWidth <= 0 || availableHeight <= 0) {
            setTimeout(() => createGridLines(columns, rows, gap), 50);
            return;
        }

        // セル幅・高さの計算（ギャップを考慮）
        const totalGapWidth = (columns - 1) * gap;
        const totalGapHeight = (rows - 1) * gap;
        const cellWidth = (availableWidth - totalGapWidth) / columns;
        const cellHeight = (availableHeight - totalGapHeight) / rows;

        // 縦線を描画 (カラム境界)
        for (let i = 1; i < columns; i++) {
            const verticalLine = document.createElement('div');
            verticalLine.className = 'grid-line grid-line-vertical';
            const leftPosition = 20 + i * cellWidth + (i - 1) * gap + gap / 2;
            verticalLine.style.cssText = `
                position: absolute;
                top: 20px;
                bottom: 20px;
                width: 2px;
                background-color: rgba(102, 126, 234, 0.5);
                pointer-events: none;
                z-index: 0;
                left: ${leftPosition}px;
            `;
            gridContainer.appendChild(verticalLine);
        }

        // 横線を描画 (行境界)
        for (let i = 1; i < rows; i++) {
            const horizontalLine = document.createElement('div');
            horizontalLine.className = 'grid-line grid-line-horizontal';
            const topPosition = 20 + i * cellHeight + (i - 1) * gap + gap / 2;
            horizontalLine.style.cssText = `
                position: absolute;
                left: 20px;
                right: 20px;
                height: 2px;
                background-color: rgba(102, 126, 234, 0.5);
                pointer-events: none;
                z-index: 0;
                top: ${topPosition}px;
            `;
            gridContainer.appendChild(horizontalLine);
        }
    }

    function createGridItem(row = null, col = null) {
        // 空いているセルを見つける
        const columns = parseInt(columnsInput.value);
        const rows = parseInt(rowsInput.value);

        let targetRow = 1;
        let targetCol = 1;

        if (row !== null && col !== null) {
            targetRow = row;
            targetCol = col;
        } else {
            // 空いているセルを探す
            found: for (let r = 1; r <= rows; r++) {
                for (let c = 1; c <= columns; c++) {
                    const occupied = gridItems.some(item => {
                        const [rowStart, colStart, rowEnd, colEnd] = item.gridArea.split(' / ').map(Number);
                        return r >= rowStart && r < rowEnd && c >= colStart && c < colEnd;
                    });
                    if (!occupied) {
                        targetRow = r;
                        targetCol = c;
                        break found;
                    }
                }
            }
        }

        const item = {
            id: `item-${itemCounter}`,
            name: `Item ${itemCounter}`,
            gridArea: `${targetRow} / ${targetCol} / ${targetRow + 1} / ${targetCol + 1}`
        };

        const itemElement = document.createElement('div');
        itemElement.className = 'grid-item';
        itemElement.dataset.id = item.id;
        itemElement.style.gridArea = item.gridArea;
        itemElement.textContent = item.name;

        // 削除ボタンを追加
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            removeGridItem(item.id);
        };

        // リサイズハンドルを追加
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';

        itemElement.appendChild(deleteBtn);
        itemElement.appendChild(resizeHandle);
        gridContainer.appendChild(itemElement);

        // イベントリスナーを追加
        itemElement.addEventListener('click', (e) => {
            e.stopPropagation();
            selectItem(item.id);
        });
        itemElement.addEventListener('mousedown', startDrag);
        itemElement.addEventListener('touchstart', startDrag, { passive: false });
        resizeHandle.addEventListener('mousedown', startResize);
        resizeHandle.addEventListener('touchstart', startResize, { passive: false });

        console.log('グリッドアイテム作成:', item.id, 'イベントリスナー設定完了');

        gridItems.push(item);
        itemCounter++;

        generateCode();
        updateCellLabels();
        selectItem(item.id);
    }

    function removeGridItem(itemId) {
        gridItems = gridItems.filter(item => item.id !== itemId);
        const itemElement = gridContainer.querySelector(`[data-id="${itemId}"]`);
        if (itemElement) {
            itemElement.remove();
        }
        if (selectedItem === itemId) {
            selectedItem = null;
            updateSelectedInfo();
        }
        generateCode();
        updateCellLabels();
    }

    function selectItem(itemId) {
        // 前の選択を解除
        gridContainer.querySelectorAll('.grid-item').forEach(el => {
            el.classList.remove('selected');
        });

        // 新しい選択を設定
        const itemElement = gridContainer.querySelector(`[data-id="${itemId}"]`);
        if (itemElement) {
            itemElement.classList.add('selected');
            selectedItem = itemId;
        }

        updateSelectedInfo();
    }

    function updateSelectedInfo() {
        // selectedInfo要素が存在しない場合は何もしない
        if (!selectedInfo) return;

        if (!selectedItem) {
            selectedInfo.textContent = 'アイテムを選択してください';
            return;
        }

        const item = gridItems.find(i => i.id === selectedItem);
        if (item) {
            const [rowStart, colStart, rowEnd, colEnd] = item.gridArea.split(' / ');
            selectedInfo.innerHTML = `
                <strong>${item.name}</strong><br>
                グリッドエリア: ${item.gridArea}<br>
                行: ${rowStart} - ${rowEnd}, 列: ${colStart} - ${colEnd}
            `;
        }
    }

    function startDrag(e) {
        if (e.target.classList.contains('delete-btn') || e.target.classList.contains('resize-handle')) {
            return;
        }

        console.log('ドラッグ開始:', e.currentTarget.dataset.id);
        isDragging = true;
        const item = e.currentTarget;
        item.classList.add('dragging');

        // タッチイベントとマウスイベントの座標を統一
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        dragStartPos = {
            x: clientX,
            y: clientY
        };

        selectItem(item.dataset.id);

        // タッチとマウス両方のイベントを追加
        document.addEventListener('mousemove', onDrag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('touchend', endDrag);

        e.preventDefault();
    }

    function onDrag(e) {
        if (!isDragging || !selectedItem) return;

        // タッチイベントとマウスイベントの座標を統一
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = gridContainer.getBoundingClientRect();
        const x = clientX - rect.left - 20; // パディング20pxを考慮
        const y = clientY - rect.top - 20;  // パディング20pxを考慮

        // グリッドの位置を計算
        const columns = parseInt(columnsInput.value);
        const rows = parseInt(rowsInput.value);
        const gap = parseInt(gapInput.value);

        const availableWidth = gridContainer.offsetWidth - 40; // パディング20px x 2
        const availableHeight = gridContainer.offsetHeight - 40; // パディング20px x 2

        const cellWidth = (availableWidth - gap * (columns - 1)) / columns;
        const cellHeight = (availableHeight - gap * (rows - 1)) / rows;

        // セル位置を計算（ギャップを考慮）
        let col = 1;
        let row = 1;

        let currentX = 0;
        for (let c = 1; c <= columns; c++) {
            if (x < currentX + cellWidth) {
                col = c;
                break;
            }
            currentX += cellWidth + gap;
            col = c + 1;
        }

        let currentY = 0;
        for (let r = 1; r <= rows; r++) {
            if (y < currentY + cellHeight) {
                row = r;
                break;
            }
            currentY += cellHeight + gap;
            row = r + 1;
        }

        // 範囲内に収める
        col = Math.max(1, Math.min(columns, col));
        row = Math.max(1, Math.min(rows, row));

        const selectedElement = gridContainer.querySelector(`[data-id="${selectedItem}"]`);
        if (selectedElement) {
            const currentArea = selectedElement.style.gridArea.split(' / ');
            const rowSpan = parseInt(currentArea[2]) - parseInt(currentArea[0]);
            const colSpan = parseInt(currentArea[3]) - parseInt(currentArea[1]);

            // 新しい位置がグリッド範囲を超えないようにチェック
            const newRowEnd = Math.min(rows + 1, row + rowSpan);
            const newColEnd = Math.min(columns + 1, col + colSpan);
            const adjustedRow = Math.max(1, newRowEnd - rowSpan);
            const adjustedCol = Math.max(1, newColEnd - colSpan);

            const newArea = `${adjustedRow} / ${adjustedCol} / ${adjustedRow + rowSpan} / ${adjustedCol + colSpan}`;
            selectedElement.style.gridArea = newArea;

            // アイテムデータを更新
            const item = gridItems.find(i => i.id === selectedItem);
            if (item) {
                item.gridArea = newArea;
            }
        }

        e.preventDefault();
    }

    function endDrag() {
        isDragging = false;
        const draggingElement = gridContainer.querySelector('.dragging');
        if (draggingElement) {
            draggingElement.classList.remove('dragging');
        }

        // すべてのイベントリスナーを削除
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', endDrag);

        generateCode();
        updateCellLabels();
        updateSelectedInfo();
    }

    function startResize(e) {
        e.stopPropagation();
        console.log('リサイズ開始:', e.target.closest('.grid-item').dataset.id);
        isResizing = true;

        const item = e.target.closest('.grid-item');
        item.classList.add('resizing');
        selectItem(item.dataset.id);

        // タッチイベントとマウスイベントの座標を統一
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        resizeStartPos = {
            x: clientX,
            y: clientY
        };

        originalArea = item.style.gridArea;

        // タッチとマウス両方のイベントを追加
        document.addEventListener('mousemove', onResize, { passive: false });
        document.addEventListener('mouseup', endResize);
        document.addEventListener('touchmove', onResize, { passive: false });
        document.addEventListener('touchend', endResize);

        e.preventDefault();
    }

    function onResize(e) {
        if (!isResizing || !selectedItem) return;

        // タッチイベントとマウスイベントの座標を統一
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const deltaX = clientX - resizeStartPos.x;
        const deltaY = clientY - resizeStartPos.y;

        const columns = parseInt(columnsInput.value);
        const rows = parseInt(rowsInput.value);
        const gap = parseInt(gapInput.value);

        const availableWidth = gridContainer.offsetWidth - 40; // パディング20px x 2
        const availableHeight = gridContainer.offsetHeight - 40; // パディング20px x 2

        const cellWidth = (availableWidth - gap * (columns - 1)) / columns;
        const cellHeight = (availableHeight - gap * (rows - 1)) / rows;

        // より精密なリサイズ計算
        const colDelta = Math.round(deltaX / (cellWidth + gap));
        const rowDelta = Math.round(deltaY / (cellHeight + gap));

        const selectedElement = gridContainer.querySelector(`[data-id="${selectedItem}"]`);
        if (selectedElement && originalArea) {
            const [rowStart, colStart, rowEnd, colEnd] = originalArea.split(' / ').map(Number);

            const newRowEnd = Math.max(rowStart + 1, Math.min(rows + 1, rowEnd + rowDelta));
            const newColEnd = Math.max(colStart + 1, Math.min(columns + 1, colEnd + colDelta));

            const newArea = `${rowStart} / ${colStart} / ${newRowEnd} / ${newColEnd}`;
            selectedElement.style.gridArea = newArea;

            // アイテムデータを更新
            const item = gridItems.find(i => i.id === selectedItem);
            if (item) {
                item.gridArea = newArea;
            }
        }

        e.preventDefault();
    }

    function endResize() {
        isResizing = false;
        const resizingElement = gridContainer.querySelector('.resizing');
        if (resizingElement) {
            resizingElement.classList.remove('resizing');
        }

        // すべてのイベントリスナーを削除
        document.removeEventListener('mousemove', onResize);
        document.removeEventListener('mouseup', endResize);
        document.removeEventListener('touchmove', onResize);
        document.removeEventListener('touchend', endResize);

        generateCode();
        updateCellLabels();
        updateSelectedInfo();
    }

    function resetGrid() {
        gridItems = [];
        selectedItem = null;
        itemCounter = 1;
        gridContainer.innerHTML = '';
        updateSelectedInfo();
        generateCode();
        updateCellLabels();
    }

    function generateCode() {
        const columns = columnsInput.value;
        const rows = rowsInput.value;
        const gap = gapInput.value;

        // CSS生成（Grid関連プロパティのみ）
        let css = `.grid-container {\n`;
        css += `  display: grid;\n`;
        css += `  grid-template-columns: repeat(${columns}, 1fr);\n`;
        css += `  grid-template-rows: repeat(${rows}, 1fr);\n`;
        css += `  gap: ${gap}px;\n`;
        css += `}\n\n`;

        gridItems.forEach(item => {
            css += `.grid-item-${item.id.split('-')[1]} {\n`;
            css += `  grid-area: ${item.gridArea};\n`;
            css += `}\n\n`;
        });

        cssOutput.value = css;

        // HTML生成
        let html = `<div class="grid-container">\n`;
        gridItems.forEach(item => {
            html += `  <div class="grid-item-${item.id.split('-')[1]}">${item.name}</div>\n`;
        });
        html += `</div>`;

        htmlOutput.value = html;
    }

    // CSS/HTMLタブ切り替え
    document.querySelectorAll('.css-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // 日本語版はdata-target、英語版はdata-outputを使用
            const target = tab.dataset.target || tab.dataset.output;

            // タブの状態を更新
            document.querySelectorAll('.css-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 出力エリアの表示を切り替え
            const cssOutput = document.getElementById('grid-css-output');
            const htmlOutput = document.getElementById('grid-html-output');

            if (target === 'grid-css-output' || target === 'container') {
                cssOutput.style.display = 'block';
                htmlOutput.style.display = 'none';
            } else if (target === 'grid-html-output' || target === 'items') {
                cssOutput.style.display = 'none';
                htmlOutput.style.display = 'block';
            }
        });
    });

    function setupGridContainerEvents() {
        // グリッドコンテナのクリックイベント
        gridContainer.addEventListener('click', (e) => {
            // グリッドアイテム以外をクリックした場合
            if (!e.target.closest('.grid-item')) {
                const rect = gridContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // クリック位置からグリッド座標を計算
                const columns = parseInt(columnsInput.value);
                const rows = parseInt(rowsInput.value);
                const gap = parseInt(gapInput.value);

                const cellWidth = (gridContainer.offsetWidth - gap * (columns - 1)) / columns;
                const cellHeight = (gridContainer.offsetHeight - gap * (rows - 1)) / rows;

                const col = Math.max(1, Math.min(columns, Math.floor(x / (cellWidth + gap)) + 1));
                const row = Math.max(1, Math.min(rows, Math.floor(y / (cellHeight + gap)) + 1));

                // そのセルが空いているかチェック
                const occupied = gridItems.some(item => {
                    const [rowStart, colStart, rowEnd, colEnd] = item.gridArea.split(' / ').map(Number);
                    return row >= rowStart && row < rowEnd && col >= colStart && col < colEnd;
                });

                if (!occupied) {
                    createGridItem(row, col);
                }
            }
        });

        // 右クリックでコンテキストメニュー
        gridContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            const gridItem = e.target.closest('.grid-item');
            if (gridItem) {
                const itemId = gridItem.dataset.id;
                removeGridItem(itemId);
            }
        });

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            // グリッドページでのみ動作（URLでページを判定）
            if (!window.location.pathname.includes('/grid/')) return;

            switch(e.key) {
                case 'Delete':
                case 'Backspace':
                    if (selectedItem) {
                        e.preventDefault();
                        removeGridItem(selectedItem);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    console.log('Escape押下 - 選択解除');
                    selectedItem = null;
                    gridContainer.querySelectorAll('.grid-item').forEach(el => {
                        el.classList.remove('selected');
                    });
                    updateSelectedInfo();
                    break;
            }
        });
    }

    // ボタンのイベントリスナーを設定（要素が存在する場合のみ）
    const addItemBtn = document.getElementById('add-grid-item');
    const resetGridBtn = document.getElementById('reset-grid');

    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            createGridItem();
        });
    }

    if (resetGridBtn) {
        resetGridBtn.addEventListener('click', () => {
            resetGrid();
        });
    }

    // イベントリスナーを設定
    [columnsInput, rowsInput, gapInput].forEach(element => {
        element.addEventListener('input', updateGrid);
    });

    setupGridContainerEvents();

    // ウィンドウリサイズ時のグリッドライン再描画
    window.addEventListener('resize', () => {
        if (window.location.pathname.includes('/grid/')) {
            setTimeout(() => {
                updateCellLabels();
            }, 100);
        }
    });

    // グローバル参照用にupdateCellLabelsを登録
    window.gridUpdateCellLabels = updateCellLabels;

    // 初期化
    updateGrid();

    // 初期アイテムを2つ作成（重ならないように）
    createGridItem(1, 1); // 左上
    createGridItem(2, 2); // 中央下

    // 初期表示時のグリッドライン描画（レイアウト確定後に実行）
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            updateCellLabels();
        });
    });
}

// マージン・パディングジェネレーター
function initializeMarginPaddingGenerator() {
    // マージン関連の要素
    const marginTop = document.getElementById('margin-top');
    const marginRight = document.getElementById('margin-right');
    const marginBottom = document.getElementById('margin-bottom');
    const marginLeft = document.getElementById('margin-left');
    // パディング関連の要素
    const paddingTop = document.getElementById('padding-top');
    const paddingRight = document.getElementById('padding-right');
    const paddingBottom = document.getElementById('padding-bottom');
    const paddingLeft = document.getElementById('padding-left');

    // 数値入力要素
    const marginTopInput = document.getElementById('margin-top-input');
    const marginRightInput = document.getElementById('margin-right-input');
    const marginBottomInput = document.getElementById('margin-bottom-input');
    const marginLeftInput = document.getElementById('margin-left-input');
    const paddingTopInput = document.getElementById('padding-top-input');
    const paddingRightInput = document.getElementById('padding-right-input');
    const paddingBottomInput = document.getElementById('padding-bottom-input');
    const paddingLeftInput = document.getElementById('padding-left-input');

    // 値表示要素
    const marginTopValue = document.getElementById('margin-top-value');
    const marginRightValue = document.getElementById('margin-right-value');
    const marginBottomValue = document.getElementById('margin-bottom-value');
    const marginLeftValue = document.getElementById('margin-left-value');
    const paddingTopValue = document.getElementById('padding-top-value');
    const paddingRightValue = document.getElementById('padding-right-value');
    const paddingBottomValue = document.getElementById('padding-bottom-value');
    const paddingLeftValue = document.getElementById('padding-left-value');

    // プレビューと出力
    const previewContainer = document.querySelector('.spacing-preview-container');
    const previewOuter = document.querySelector('.spacing-preview-outer');
    const previewMarginArea = document.querySelector('.spacing-preview-margin-area');
    const previewElement = document.querySelector('.spacing-preview-element');
    const previewContent = document.querySelector('.spacing-preview-content');
    const output = document.getElementById('spacing-output');

    // ラベル要素
    const marginLabels = document.querySelectorAll('.margin-labels span');
    const paddingLabels = document.querySelectorAll('.padding-labels span');

    // 必要な要素が存在しない場合は処理を中断
    if (!marginTop || !marginRight || !marginBottom || !marginLeft || 
        !paddingTop || !paddingRight || !paddingBottom || !paddingLeft || 
        !previewElement || !output) {
        console.warn('Margin & Padding Generator: Required elements not found');
        return;
    }



    function updateSpacing() {
        const margins = {
            top: marginTop.value,
            right: marginRight.value,
            bottom: marginBottom.value,
            left: marginLeft.value
        };

        const paddings = {
            top: paddingTop.value,
            right: paddingRight.value,
            bottom: paddingBottom.value,
            left: paddingLeft.value
        };

        // 値表示を更新
        if (marginTopValue) marginTopValue.textContent = `${margins.top}px`;
        if (marginRightValue) marginRightValue.textContent = `${margins.right}px`;
        if (marginBottomValue) marginBottomValue.textContent = `${margins.bottom}px`;
        if (marginLeftValue) marginLeftValue.textContent = `${margins.left}px`;
        if (paddingTopValue) paddingTopValue.textContent = `${paddings.top}px`;
        if (paddingRightValue) paddingRightValue.textContent = `${paddings.right}px`;
        if (paddingBottomValue) paddingBottomValue.textContent = `${paddings.bottom}px`;
        if (paddingLeftValue) paddingLeftValue.textContent = `${paddings.left}px`;

        // 数値入力との同期
        if (marginTopInput) marginTopInput.value = margins.top;
        if (marginRightInput) marginRightInput.value = margins.right;
        if (marginBottomInput) marginBottomInput.value = margins.bottom;
        if (marginLeftInput) marginLeftInput.value = margins.left;
        if (paddingTopInput) paddingTopInput.value = paddings.top;
        if (paddingRightInput) paddingRightInput.value = paddings.right;
        if (paddingBottomInput) paddingBottomInput.value = paddings.bottom;
        if (paddingLeftInput) paddingLeftInput.value = paddings.left;

        // プレビューの更新
        if (previewMarginArea) {
            previewMarginArea.style.padding = `${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px`;
        }

        if (previewElement) {
            previewElement.style.padding = `${paddings.top}px ${paddings.right}px ${paddings.bottom}px ${paddings.left}px`;
        }

        // ラベルを更新
        if (marginLabels && marginLabels.length >= 4) {
            marginLabels[0].textContent = `${margins.top}px`;
            marginLabels[1].textContent = `${margins.right}px`;
            marginLabels[2].textContent = `${margins.bottom}px`;
            marginLabels[3].textContent = `${margins.left}px`;
        }

        if (paddingLabels && paddingLabels.length >= 4) {
            paddingLabels[0].textContent = `${paddings.top}px`;
            paddingLabels[1].textContent = `${paddings.right}px`;
            paddingLabels[2].textContent = `${paddings.bottom}px`;
            paddingLabels[3].textContent = `${paddings.left}px`;
        }

        // CSSコードの生成
        const marginCSS = `margin: ${margins.top}px ${margins.right}px ${margins.bottom}px ${margins.left}px;`;
        const paddingCSS = `padding: ${paddings.top}px ${paddings.right}px ${paddings.bottom}px ${paddings.left}px;`;

        output.value = `${marginCSS}\n${paddingCSS}`;
    }

    // 新しい同期ボタン機能
    const syncMarginTopButton = document.getElementById('sync-margin-top');
    const syncMarginBottomButton = document.getElementById('sync-margin-bottom');
    const syncPaddingTopButton = document.getElementById('sync-padding-top');
    const syncPaddingBottomButton = document.getElementById('sync-padding-bottom');

    // マージン「上に合わせる」機能（最大値に合わせる）
    if (syncMarginTopButton) {
        syncMarginTopButton.addEventListener('click', () => {
            const values = [
                parseInt(marginTop.value),
                parseInt(marginRight.value),
                parseInt(marginBottom.value),
                parseInt(marginLeft.value)
            ];
            const maxValue = Math.max(...values);

            marginTop.value = maxValue;
            marginRight.value = maxValue;
            marginBottom.value = maxValue;
            marginLeft.value = maxValue;
            updateSpacing();
            showNotification(`マージンを最大値（${maxValue}px）に同期しました`, 'success');
        });
    }

    // マージン「下に合わせる」機能（最小値に合わせる）
    if (syncMarginBottomButton) {
        syncMarginBottomButton.addEventListener('click', () => {
            const values = [
                parseInt(marginTop.value),
                parseInt(marginRight.value),
                parseInt(marginBottom.value),
                parseInt(marginLeft.value)
            ];
            const minValue = Math.min(...values);

            marginTop.value = minValue;
            marginRight.value = minValue;
            marginBottom.value = minValue;
            marginLeft.value = minValue;
            updateSpacing();
            showNotification(`マージンを最小値（${minValue}px）に同期しました`, 'success');
        });
    }

    // パディング「上に合わせる」機能（最大値に合わせる）
    if (syncPaddingTopButton) {
        syncPaddingTopButton.addEventListener('click', () => {
            const values = [
                parseInt(paddingTop.value),
                parseInt(paddingRight.value),
                parseInt(paddingBottom.value),
                parseInt(paddingLeft.value)
            ];
            const maxValue = Math.max(...values);

            paddingTop.value = maxValue;
            paddingRight.value = maxValue;
            paddingBottom.value = maxValue;
            paddingLeft.value = maxValue;
            updateSpacing();
            showNotification(`パディングを最大値（${maxValue}px）に同期しました`, 'success');
        });
    }

    // パディング「下に合わせる」機能（最小値に合わせる）
    if (syncPaddingBottomButton) {
        syncPaddingBottomButton.addEventListener('click', () => {
            const values = [
                parseInt(paddingTop.value),
                parseInt(paddingRight.value),
                parseInt(paddingBottom.value),
                parseInt(paddingLeft.value)
            ];
            const minValue = Math.min(...values);

            paddingTop.value = minValue;
            paddingRight.value = minValue;
            paddingBottom.value = minValue;
            paddingLeft.value = minValue;
            updateSpacing();
            showNotification(`パディングを最小値（${minValue}px）に同期しました`, 'success');
        });
    }

    // 数値入力からスライダーへの同期
    function syncFromNumberInput(input, slider) {
        input.addEventListener('input', () => {
            let value = parseInt(input.value);
            if (isNaN(value)) value = 0;
            if (value < 0) value = 0;
            if (value > 200) value = 200;
            slider.value = value;
            input.value = value;
            updateSpacing();
        });
    }

    // 数値入力イベントリスナー設定（要素が存在する場合のみ）
    if (marginTopInput) syncFromNumberInput(marginTopInput, marginTop);
    if (marginRightInput) syncFromNumberInput(marginRightInput, marginRight);
    if (marginBottomInput) syncFromNumberInput(marginBottomInput, marginBottom);
    if (marginLeftInput) syncFromNumberInput(marginLeftInput, marginLeft);
    if (paddingTopInput) syncFromNumberInput(paddingTopInput, paddingTop);
    if (paddingRightInput) syncFromNumberInput(paddingRightInput, paddingRight);
    if (paddingBottomInput) syncFromNumberInput(paddingBottomInput, paddingBottom);
    if (paddingLeftInput) syncFromNumberInput(paddingLeftInput, paddingLeft);

    // イベントリスナーの追加
    [marginTop, marginRight, marginBottom, marginLeft,
     paddingTop, paddingRight, paddingBottom, paddingLeft].forEach(element => {
        element.addEventListener('input', updateSpacing);
    });

    // 初期化
    updateSpacing();
    console.log('マージン・パディングジェネレーター初期化完了');
}

// モバイルメニュー機能
function toggleMobileMenu() {
    const navTabs = document.querySelector('.nav-tabs');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const icon = toggleButton.querySelector('i');

    navTabs.classList.toggle('expanded');

    if (navTabs.classList.contains('expanded')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// モーダル機能
const modalData = {
    about: {
        title: '<i class="fas fa-info-circle"></i> このサイトについて',
        content: `
            <h3>CSSスタイルメーカーについて</h3>
            <p>CSSスタイルメーカーは、美しいCSSコードを簡単に生成できる無料のツール集です。Web制作の効率化とデザインの可能性を広げることを目指しています。</p>

            <h3>主な機能</h3>
            <ul>
                <li><strong>グラデーションジェネレーター</strong> - 線形・放射状グラデーションの作成</li>
                <li><strong>ボックスシャドウジェネレーター</strong> - 詳細な影効果の設定</li>
                <li><strong>角丸ジェネレーター</strong> - 各角の個別調整</li>
                <li><strong>グリッドジェネレーター</strong> - レスポンシブなグリッドレイアウトの作成</li>
                <li><strong>フレックスボックスジェネレーター</strong> - レイアウト設定の可視化</li>
                <li><strong>テキストシャドウジェネレーター</strong> - 文字の影効果</li>
                <li><strong>トランスフォームジェネレーター</strong> - 回転・拡大・移動・傾斜</li>
                <li><strong>CSSアニメーションジェネレーター</strong> - キーフレームアニメーション効果の作成</li>
                <li><strong>クリップパスジェネレーター</strong> - 複雑な切り抜き形状の作成</li>
                <li><strong>マージン・パディングジェネレーター</strong> - 要素の余白設定</li>
            </ul>

            <h3>特徴</h3>
            <ul>
                <li>リアルタイムプレビュー機能</li>
                <li>ワンクリックでCSSコードをコピー</li>
                <li>レスポンシブデザイン対応</li>
                <li>完全無料でご利用可能</li>
                <li>アカウント登録不要</li>
            </ul>

            <div class="highlight">
                <p><strong>目標:</strong> Web制作の効率化と、デザインの可能性を広げることを目指しています。初心者からプロまで、誰でも簡単に美しいCSSを作成できる環境を提供します。</p>
            </div>
        `
    },
    contact: {
        title: '<i class="fas fa-envelope"></i> お問い合わせ',
        content: `
            <h3>お問い合わせについて</h3>
            <p>CSSスタイルメーカーに関するご質問、ご要望、不具合報告などがございましたら、以下の方法でお気軽にお問い合わせください。</p>

            <div class="contact-info">
                <h4><i class="fab fa-x-twitter"></i> X（旧Twitter）</h4>
                <p><a href="https://x.com/sanada_ejs" target="_blank">@sanada_ejs</a></p>
                <p>最も迅速に対応可能です。DMまたはメンションでお気軽にご連絡ください。</p>
            </div>

            <h3>お問い合わせ内容例</h3>
            <ul>
                <li>新機能のご要望・ご提案</li>
                <li>操作方法に関するご質問</li>
                <li>不具合やエラーの報告</li>
                <li>サイトの改善提案</li>
                <li>コラボレーションのご相談</li>
                <li>その他、サイトに関するご意見</li>
            </ul>

            <h3>お問い合わせ時のお願い</h3>
            <ul>
                <li>具体的な状況やエラー内容をお教えください</li>
                <li>ご利用のブラウザ・デバイス情報があると助かります</li>
                <li>スクリーンショットがあると問題解決が早くなります</li>
            </ul>

            <div class="highlight">
                <p><strong>対応時間:</strong> 通常24時間以内にご返信いたします。土日祝日は返信が遅れる場合がございます。</p>
            </div>
        `
    },
    privacy: {
        title: '<i class="fas fa-shield-alt"></i> プライバシーポリシー',
        content: `
            <h3>個人情報の取り扱いについて</h3>
            <p>CSSスタイルメーカー（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>

            <h3>収集する情報</h3>
            <p>当サイトでは以下の情報を収集する場合があります：</p>
            <ul>
                <li>Google Analyticsによるアクセス解析データ</li>
                <li>ブラウザの種類、OS、画面解像度等の技術情報</li>
                <li>サイト内での行動履歴（ページビュー、滞在時間等）</li>
            </ul>

            <h3>情報の利用目的</h3>
            <ul>
                <li>サイトの改善・最適化</li>
                <li>ユーザビリティの向上</li>
                <li>統計データの作成</li>
                <li>技術的問題の解決</li>
            </ul>

            <h3>Cookieについて</h3>
            <p>当サイトでは、より良いサービス提供のためCookieを使用しています：</p>
            <ul>
                <li>Google AnalyticsによるCookie</li>
                <li>サイトの設定保存用Cookie</li>
            </ul>

            <div class="important">
                <p><strong>重要:</strong> 当サイトは個人を特定できる情報（氏名、メールアドレス、電話番号等）は収集いたしません。</p>
            </div>

            <h3>第三者への情報提供</h3>
            <p>当サイトは、法令に基づく場合を除き、収集した情報を第三者に提供することはありません。</p>

            <h3>Google Analyticsについて</h3>
            <p>当サイトはGoogle Analyticsを使用しており、Googleのプライバシーポリシーが適用されます。詳細は<a href="https://policies.google.com/privacy" target="_blank">Googleプライバシーポリシー</a>をご確認ください。</p>

            <h3>プライバシーポリシーの変更</h3>
            <p>本ポリシーは予告なく変更される場合があります。変更後のポリシーは当サイト上に掲載された時点で効力を生じます。</p>

            <p><strong>最終更新日:</strong> 2025年6月19日</p>
        `
    },
    terms: {
        title: '<i class="fas fa-file-contract"></i> 利用規約',
        content: `
            <h3>利用規約</h3>
            <p>CSSスタイルメーカー（以下「当サイト」）をご利用いただく際は、以下の利用規約にご同意いただいたものとみなします。</p>

            <h3>サービス内容</h3>
            <p>当サイトは、CSSコード生成ツールを無料で提供するWebサービスです。</p>

            <h3>利用条件</h3>
            <ul>
                <li>当サイトは誰でも無料でご利用いただけます</li>
                <li>商用・非商用を問わずご利用可能です</li>
                <li>生成されたCSSコードは自由にご利用いただけます</li>
                <li>アカウント登録は不要です</li>
            </ul>

            <h3>禁止行為</h3>
            <p>以下の行為は禁止されています：</p>
            <ul>
                <li>サーバーに過度な負荷をかける行為</li>
                <li>不正アクセスやハッキング行為</li>
                <li>他のユーザーの利用を妨害する行為</li>
                <li>法令に違反する行為</li>
                <li>当サイトの運営を妨害する行為</li>
            </ul>

            <h3>免責事項</h3>
            <ul>
                <li>当サイトの利用により生じた損害について、運営者は一切の責任を負いません</li>
                <li>生成されたCSSコードの動作保証はいたしません</li>
                <li>サービスの中断・終了により生じた損害について責任を負いません</li>
                <li>当サイトの情報の正確性・完全性を保証するものではありません</li>
            </ul>

            <h3>知的財産権</h3>
            <ul>
                <li>当サイトのデザイン・プログラム等の著作権は運営者に帰属します</li>
                <li>生成されたCSSコードの著作権は利用者に帰属します</li>
                <li>当サイトの無断複製・転載は禁止されています</li>
            </ul>

            <div class="highlight">
                <p><strong>ライセンス:</strong> 生成されたCSSコードは、利用者が自由に使用・改変・配布することができます。</p>
            </div>

            <h3>サービスの変更・終了</h3>
            <p>運営者は、事前の通知なくサービス内容の変更・中断・終了を行う場合があります。</p>

            <h3>利用規約の変更</h3>
            <p>本規約は予告なく変更される場合があります。変更後の規約は当サイト上に掲載された時点で効力を生じます。</p>

            <h3>準拠法・管轄裁判所</h3>
            <p>本規約は日本法に準拠し、東京地方裁判所を専属的管轄裁判所とします。</p>

            <p><strong>制定日:</strong> 2025年6月19日</p>
        `
    }
};

// 英語版のモーダルデータ
const modalDataEn = {
    about: {
        title: 'About This Site',
        content: `
            <h3>About CSS Style Maker</h3>
            <p>CSS Style Maker is a free tool collection for easily generating beautiful CSS code. It's designed to make web development more efficient and expand design possibilities.</p>

            <h3>Main Features</h3>
            <ul>
                <li><strong>Gradient Generator</strong> - Create linear and radial gradients</li>
                <li><strong>Box Shadow Generator</strong> - Detailed shadow effect settings</li>
                <li><strong>Border Radius Generator</strong> - Individual border-radius adjustments</li>
                <li><strong>Grid Generator</strong> - Create responsive grid layouts</li>
                <li><strong>Flexbox Generator</strong> - Visualize layout settings</li>
                <li><strong>Text Shadow Generator</strong> - Text shadow effects</li>
                <li><strong>Transform Generator</strong> - Rotation, scaling, translation, skewing</li>
                <li><strong>CSS Animation Generator</strong> - Create keyframe animation effects</li>
                <li><strong>Clip Path Generator</strong> - Create complex clipping shapes</li>
                <li><strong>Margin & Padding Generator</strong> - Element spacing settings</li>
            </ul>

            <h3>Usage</h3>
            <p>Select the desired generator from the tab menu, adjust the settings, and copy the generated CSS code. All tools are free to use.</p>

            <h3>Target Users</h3>
            <ul>
                <li>Web designers</li>
                <li>Front-end developers</li>
                <li>CSS beginners</li>
                <li>Anyone who wants to create beautiful web designs</li>
            </ul>
        `
    },
    contact: {
        title: 'Contact',
        content: `
            <h3>Contact Information</h3>
            <p>If you have any questions, feedback, or requests regarding CSS Style Maker, please contact us through the following methods:</p>

            <div class="contact-info">
                <h4>X (formerly Twitter)</h4>
                <p><a href="https://x.com/sanada_ejs" target="_blank">@sanada_ejs</a></p>
            </div>

            <h3>Feedback Welcome</h3>
            <ul>
                <li>Bug reports</li>
                <li>Feature requests</li>
                <li>Improvement suggestions</li>
                <li>Questions about usage</li>
            </ul>

            <p>We appreciate your feedback to make CSS Style Maker even better.</p>
        `
    },
    privacy: {
        title: 'Privacy Policy',
        content: `
            <h3>Information Collection</h3>
            <p>This site uses Google Analytics to collect access information for improving the site. The collected information is used only for statistical analysis and does not identify individuals.</p>

            <h3>Use of Cookies</h3>
            <p>This site may use cookies to improve user experience. Cookies do not contain personal information.</p>

            <h3>Use of Generated CSS</h3>
            <p>All CSS code generated using this tool can be used freely for commercial and non-commercial purposes. No attribution is required.</p>

            <h3>Disclaimer</h3>
            <p>While we strive to ensure the accuracy of information on this site, we cannot guarantee that all information is accurate, complete, or up-to-date. Users use this site at their own risk.</p>

            <h3>Policy Changes</h3>
            <p>This policy may be changed without notice. The revised policy will take effect when posted on this site.</p>

            <p><strong>Last Updated:</strong> June 19, 2025</p>
        `
    },
    terms: {
        title: 'Terms of Use',
        content: `
            <h3>Acceptance of Terms</h3>
            <p>By using CSS Style Maker, you agree to these terms of use.</p>

            <h3>Use of the Service</h3>
            <ul>
                <li>This service is provided free of charge</li>
                <li>Generated CSS code can be used freely</li>
                <li>Commercial use is permitted</li>
                <li>No user registration is required</li>
            </ul>

            <h3>Prohibited Uses</h3>
            <ul>
                <li>Actions that violate laws or regulations</li>
                <li>Actions that infringe on the rights of others</li>
                <li>Actions that place excessive load on the server</li>
                <li>Other actions deemed inappropriate by the administrator</li>
            </ul>

            <h3>Disclaimer</h3>
            <p>We are not responsible for any damages arising from the use of this service. Users use this service at their own risk.</p>

            <h3>Service Changes and Termination</h3>
            <p>We may change or terminate the service without notice. We are not responsible for any damages arising from service changes or termination.</p>

            <h3>Changes to Terms</h3>
            <p>These terms may be changed without notice. Continued use of the service after changes constitutes acceptance of the new terms.</p>

            <p><strong>Last Updated:</strong> June 19, 2025</p>
        `
    }
};

// モーダルを開く関数
function openModal(type) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');

    // 言語を判定（英語版かどうか）
    const isEnglish = document.documentElement.lang === 'en';
    const modalContent = isEnglish ? modalDataEn[type] : modalData[type];

    if (modalContent) {
        title.innerHTML = modalContent.title;
        content.innerHTML = modalContent.content;

        // モーダルコンテンツのスクロール位置を即座にリセット
        content.scrollTop = 0;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // スクロール無効化

        // アニメーション後にも確実にスクロール位置をリセット
        setTimeout(() => {
            content.scrollTop = 0;
        }, 50);
    }
}

// モーダルを閉じる関数
function closeModal() {
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    modal.classList.remove('show');
    document.body.style.overflow = ''; // スクロール有効化

    // モーダルを閉じる際にもスクロール位置をリセット
    if (content) {
        content.scrollTop = 0;
    }
}

// ヘッダーナビゲーション切り替え関数（モバイル版のみ）
function toggleHeaderNav() {
    console.log('toggleHeaderNav called, window width:', window.innerWidth);

    // モバイル版でのみ動作（768px以下）
    if (window.innerWidth <= 768) {
        const headerNav = document.querySelector('.header-nav');
        const navButton = document.querySelector('.nav-button');
        const navMenu = document.querySelector('.nav-menu');

        if (headerNav && navButton && navMenu) {
            headerNav.classList.toggle('active');
            
            // メニューが開かれる時の位置調整
            if (headerNav.classList.contains('active')) {
                const buttonRect = navButton.getBoundingClientRect();
                const headerRect = document.querySelector('.header').getBoundingClientRect();
                
                // ボタンの下に配置（絶対位置で画面全体に対して）
                navMenu.style.top = (buttonRect.bottom + window.scrollY - 4) + 'px';
                navMenu.style.left = '16px';
                navMenu.style.right = '16px';
                navMenu.style.width = 'auto';
            }
            
            console.log('Header nav active state:', headerNav.classList.contains('active'));
        } else {
            console.log('Header nav element not found');
        }
    } else {
        console.log('Desktop mode - toggle ignored');
    }
}

// 画面サイズ変更時にナビゲーション状態をリセット
window.addEventListener('resize', function() {
    const headerNav = document.querySelector('.header-nav');
    if (headerNav && window.innerWidth > 768) {
        headerNav.classList.remove('active');
    }
    
    // モバイルメニューが開いている場合は位置を再調整
    if (headerNav && headerNav.classList.contains('active') && window.innerWidth <= 768) {
        updateMobileMenuPosition();
    }
});

// スクロール時にもメニュー位置を調整
window.addEventListener('scroll', function() {
    const headerNav = document.querySelector('.header-nav');
    if (headerNav && headerNav.classList.contains('active') && window.innerWidth <= 768) {
        updateMobileMenuPosition();
    }
});

// モバイルメニューの位置を更新する関数
function updateMobileMenuPosition() {
    const navButton = document.querySelector('.nav-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navButton && navMenu) {
        const buttonRect = navButton.getBoundingClientRect();
        navMenu.style.top = (buttonRect.bottom + window.scrollY + 8) + 'px';
    }
}

// モバイルナビゲーション切り替え関数
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleButton = document.querySelector('.mobile-nav-toggle');

    if (navMenu && toggleButton) {
        navMenu.classList.toggle('active');
        const icon = toggleButton.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

// DOMContentLoadedイベントにモーダル関連のイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    // モーダル関連のイベントリスナー
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // モーダルリンクのイベントリスナー
    const modalLinks = document.querySelectorAll('[data-modal]');
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalType = this.getAttribute('data-modal');
            openModal(modalType);
        });
    });

    // タブ選択時にモバイルメニューを閉じる
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // モバイル表示時のみメニューを閉じる
            if (window.innerWidth <= 768) {
                const navTabs = document.querySelector('.nav-tabs');
                const toggleButton = document.querySelector('.mobile-menu-toggle');

                if (navTabs && toggleButton) {
                    navTabs.classList.remove('expanded');
                    const icon = toggleButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // ヘッダーナビゲーションメニューのリンククリック時にメニューを閉じる
    const headerNavLinks = document.querySelectorAll('.header-nav .nav-menu a');
    headerNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const headerNav = document.querySelector('.header-nav');
                if (headerNav) {
                    headerNav.classList.remove('active');
                }
            }
        });
    });

    // メニュー外をクリックした時にメニューを閉じる
    document.addEventListener('click', function(event) {
        const headerNav = document.querySelector('.header-nav');
        const navButton = document.querySelector('.nav-button');
        const navMenu = document.querySelector('.nav-menu');
        
        if (headerNav && headerNav.classList.contains('active') && 
            !navButton.contains(event.target) && 
            !navMenu.contains(event.target)) {
            headerNav.classList.remove('active');
        }
    });

    // フッターのリンクでタブ切り替え
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetTab = link.getAttribute('href').substring(1);
            const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);

            if (targetButton) {
                e.preventDefault();
                targetButton.click();

                // ページトップにスムーズスクロール
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// アフィリエイト広告設定
const AFFILIATE_CONFIG = {
    // 表示確率（1.0 = 100%の確率で表示）
    showProbability: 0.3,

    // 表示遅延時間（ミリ秒）
    showDelay: 3000,

    // アフィリエイトリンク情報
    affiliateData: {
        href: "https://px.a8.net/svt/ejp?a8mat=457Q3O+5SZ6VU+348+6KU8H",
        imgSrc: "https://www25.a8.net/svt/bgt?aid=250623204351&wid=002&eno=01&mid=s00000000404001105000&mc=1",
        trackingPixel: "https://www17.a8.net/0.gif?a8mat=457Q3O+5SZ6VU+348+6KU8H",
        width: 336,
        height: 280,
        alt: "アフィリエイト広告"
    }
};

// アフィリエイトモーダル初期化
function initializeAffiliateModal() {
    console.log('initializeAffiliateModal: 関数開始');
    console.log('AFFILIATE_CONFIG:', AFFILIATE_CONFIG);

    const randomValue = Math.random();
    console.log('乱数値:', randomValue, '表示確率:', AFFILIATE_CONFIG.showProbability);

    // 確率判定
    if (randomValue > AFFILIATE_CONFIG.showProbability) {
        console.log('アフィリエイト広告: 確率判定で非表示');
        return; // 確率で表示しない
    }

    console.log('アフィリエイト広告: 表示予定 - ' + AFFILIATE_CONFIG.showDelay + 'ms後に表示');

    // 遅延後に表示
    setTimeout(() => {
        console.log('アフィリエイト広告: 表示実行');
        showAffiliateModal();
    }, AFFILIATE_CONFIG.showDelay);
}

// アフィリエイトモーダル表示
function showAffiliateModal() {
    console.log('showAffiliateModal: 関数開始');

    // 既存のモーダルが表示されている場合は表示しない
    if (document.getElementById('promo-modal')) {
        console.log('既存のプロモーションモーダルが存在するため表示中止');
        return;
    }

    console.log('アフィリエイトモーダル作成中...');
    const modal = createAffiliateModal();
    document.body.appendChild(modal);
    console.log('アフィリエイトモーダルをDOMに追加');



    // アニメーション用の少し遅延
    setTimeout(() => {
        modal.classList.add('show');
        console.log('アフィリエイトモーダル表示完了');
    }, 100);
}

// アフィリエイトモーダル作成
function createAffiliateModal() {
    console.log('createAffiliateModal: モーダル作成開始');

    const modal = document.createElement('div');
    modal.id = 'promo-modal';
    modal.className = 'promo-modal-overlay';

    const { affiliateData } = AFFILIATE_CONFIG;

    modal.innerHTML = `
        <div class="promo-modal-container">
            <div class="promo-modal-content">
                <a href="${affiliateData.href}" rel="nofollow" target="_blank" class="promo-link">
                    <img border="0" width="${affiliateData.width}" height="${affiliateData.height}" alt="${affiliateData.alt}" src="${affiliateData.imgSrc}">
                </a>
                <img border="0" width="1" height="1" src="${affiliateData.trackingPixel}" alt="" style="display: none;">
            </div>
            <button class="promo-close-btn" onclick="closeAffiliateModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // 背景クリックで閉じる機能
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAffiliateModal();
        }
    });

    // ESCキーで閉じる機能
    const handleEscKey = function(e) {
        if (e.key === 'Escape') {
            closeAffiliateModal();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);

    console.log('createAffiliateModal: モーダル作成完了');
    return modal;
}

// アフィリエイトモーダル閉じる
function closeAffiliateModal() {
    console.log('closeAffiliateModal: モーダルを閉じます');
    const modal = document.getElementById('promo-modal');
    if (modal) {
        modal.classList.remove('show');

        setTimeout(() => {
            modal.remove();
            console.log('アフィリエイトモーダル削除完了');
        }, 300);
    } else {
        console.log('閉じるモーダルが見つかりません');
    }
}

// ページトップボタンの制御
function initializePageTopButton() {
    // ページトップボタンが存在しない場合は何もしない
    const pageTopBtn = document.getElementById('page-top-btn');
    if (!pageTopBtn) return;

    const footer = document.querySelector('.footer');
    let isFooterFixed = false;

    // スクロールイベントでボタンの表示/非表示とフッター固定を制御
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 200px以上スクロールした時に表示
        if (scrollTop > 200) {
            pageTopBtn.classList.add('show');
        } else {
            pageTopBtn.classList.remove('show');
        }

        // フッターとの重なりチェック
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            
            // フッターが画面に入ったかチェック
            if (footerRect.top < windowHeight && footerRect.bottom > 0) {
                if (!isFooterFixed) {
                    // フッター内に絶対配置で固定
                    pageTopBtn.classList.add('footer-fixed');
                    footer.appendChild(pageTopBtn);
                    isFooterFixed = true;
                    
                    // CSSで設定されているposition: absoluteスタイルを使用
                    pageTopBtn.style.position = '';
                    pageTopBtn.style.bottom = '';
                    pageTopBtn.style.right = '';
                    pageTopBtn.style.top = '';
                }
            } else {
                if (isFooterFixed) {
                    // フッターから取り出してbodyに戻す
                    pageTopBtn.classList.remove('footer-fixed');
                    document.body.appendChild(pageTopBtn);
                    isFooterFixed = false;
                    
                    // 元のfixed位置に戻す
                    pageTopBtn.style.position = '';
                    pageTopBtn.style.bottom = '';
                    pageTopBtn.style.right = '';
                    pageTopBtn.style.top = '';
                }
            }
        }
    }

    // スクロールイベントリスナーを追加（パフォーマンス向上のためthrottle処理）
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });

    // ボタンクリック時のスムーズスクロール
    pageTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 初期状態の設定
    handleScroll();
}

// DOMContentLoadedイベントでページトップボタンを初期化
document.addEventListener('DOMContentLoaded', function() {
    initializePageTopButton();
});