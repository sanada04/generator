// CSSアニメーションジェネレーター

let currentKeyframes = '';

// アニメーションプリセット
const presets = {
    fadeIn: {
        name: 'fadeIn',
        keyframes: `@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}`,
        duration: '1',
        timingFunction: 'ease',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    slideInLeft: {
        name: 'slideInLeft',
        keyframes: `@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}`,
        duration: '0.8',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    slideInRight: {
        name: 'slideInRight',
        keyframes: `@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}`,
        duration: '0.8',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    slideInUp: {
        name: 'slideInUp',
        keyframes: `@keyframes slideInUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}`,
        duration: '0.8',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    slideInDown: {
        name: 'slideInDown',
        keyframes: `@keyframes slideInDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}`,
        duration: '0.8',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    rotateIn: {
        name: 'rotateIn',
        keyframes: `@keyframes rotateIn {
  0% {
    transform: rotate(-360deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}`,
        duration: '1.2',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    scaleIn: {
        name: 'scaleIn',
        keyframes: `@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`,
        duration: '0.6',
        timingFunction: 'ease-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'both'
    },
    bounce: {
        name: 'bounce',
        keyframes: `@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(-15px);
  }
  90% {
    transform: translateY(-4px);
  }
}`,
        duration: '2',
        timingFunction: 'ease',
        delay: '0',
        iterationCount: 'infinite',
        direction: 'normal',
        fillMode: 'none'
    },
    pulse: {
        name: 'pulse',
        keyframes: `@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}`,
        duration: '1.5',
        timingFunction: 'ease-in-out',
        delay: '0',
        iterationCount: 'infinite',
        direction: 'normal',
        fillMode: 'none'
    },
    shake: {
        name: 'shake',
        keyframes: `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}`,
        duration: '0.8',
        timingFunction: 'ease-in-out',
        delay: '0',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'none'
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    updateAnimation();
});

// プリセットアニメーションを適用
function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;

    // フォームの値を更新
    document.getElementById('animationName').value = preset.name;
    document.getElementById('duration').value = preset.duration;
    document.getElementById('timingFunction').value = preset.timingFunction;
    document.getElementById('delay').value = preset.delay;
    document.getElementById('iterationCount').value = preset.iterationCount;
    document.getElementById('direction').value = preset.direction;
    document.getElementById('fillMode').value = preset.fillMode;

    // キーフレームを設定
    currentKeyframes = preset.keyframes;

    // アクティブなプリセットボタンの表示を更新
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    updateAnimation();
}

// アニメーション設定を更新
function updateAnimation() {
    const animationName = document.getElementById('animationName').value || 'myAnimation';
    const duration = document.getElementById('duration').value;
    const timingFunction = document.getElementById('timingFunction').value;
    const delay = document.getElementById('delay').value;
    const iterationCount = document.getElementById('iterationCount').value;
    const direction = document.getElementById('direction').value;
    const fillMode = document.getElementById('fillMode').value;
    // 表示値を更新
    document.getElementById('duration-value').textContent = duration + 's';
    document.getElementById('delay-value').textContent = delay + 's';

    // デフォルトキーフレーム（プリセットが選択されていない場合）
    if (!currentKeyframes) {
        currentKeyframes = `@keyframes ${animationName} {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}`;
    } else {
        // キーフレーム名を更新
        currentKeyframes = currentKeyframes.replace(/@keyframes\s+\w+/, `@keyframes ${animationName}`);
    }

    // アニメーションプロパティ
    const animationProperty = `animation: ${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode};`;

    // CSS出力を更新
    const cssOutput = `${currentKeyframes}

.your-element {
  ${animationProperty}
}`;

    document.getElementById('cssOutput').value = cssOutput;

    // プレビューを更新
    updatePreview(animationName, animationProperty);
}

// プレビューを更新
function updatePreview(animationName, animationProperty) {
    const target = document.getElementById('animationTarget');
    const styleId = 'animation-style';
    
    // 既存のスタイルを削除
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }

    // 新しいスタイルを作成
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        ${currentKeyframes}
        
        #animationTarget {
            ${animationProperty}
        }
    `;
    
    document.head.appendChild(style);

    // アニメーションをリセットして再開始
    target.style.animation = 'none';
    target.offsetHeight; // リフロー強制
    target.style.animation = '';
}

// アニメーションを再実行
function restartAnimation() {
    const target = document.getElementById('animationTarget');
    target.style.animation = 'none';
    target.offsetHeight; // リフロー強制
    target.style.animation = '';
    
    // 少し遅延してアニメーションを再開始
    setTimeout(() => {
        updateAnimation();
    }, 10);
}

// CSSをコピー
function copyCss() {
    const cssOutput = document.getElementById('cssOutput');
    cssOutput.select();
    cssOutput.setSelectionRange(0, 99999); // モバイル対応

    try {
        document.execCommand('copy');
        
        // コピー成功のフィードバック
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> コピーしました！';
        copyBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    }
} 