document.addEventListener('DOMContentLoaded', function() {
    // 初始化编辑器功能
    initEditor();
    
    // 初始化AI Copilot功能
    initCopilot();
    
    // 初始化复选框功能
    initCheckboxes();
});

// 初始化编辑器功能
function initEditor() {
    // 获取所有可编辑元素
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    
    // 为每个可编辑元素添加事件监听器
    editableElements.forEach(element => {
        // 焦点事件
        element.addEventListener('focus', function() {
            // 显示当前选中元素的格式选项
            updateFormatToolbar(element);
        });
        
        // 输入事件
        element.addEventListener('input', function() {
            // 保存更改（这里可以添加自动保存功能）
            saveChanges();
        });
        
        // 键盘事件处理
        element.addEventListener('keydown', function(e) {
            // 处理Tab键
            if (e.key === 'Tab') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
            }
            
            // 处理回车键创建新段落
            if (e.key === 'Enter' && !e.shiftKey && element.tagName !== 'LI') {
                // 如果不是在列表项中，则创建新段落
                if (!isInsideList(element)) {
                    e.preventDefault();
                    document.execCommand('insertParagraph', false);
                }
            }
        });
    });
    
    // 添加全局键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl+B: 加粗
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            document.execCommand('bold', false);
        }
        
        // Ctrl+I: 斜体
        if (e.ctrlKey && e.key === 'i') {
            e.preventDefault();
            document.execCommand('italic', false);
        }
        
        // Ctrl+U: 下划线
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            document.execCommand('underline', false);
        }
    });
}

// 初始化AI Copilot功能
function initCopilot() {
    // 获取Copilot相关元素
    const copilotInput = document.querySelector('.copilot-input');
    const copilotSendBtn = document.querySelector('.copilot-send-btn');
    const copilotContent = document.querySelector('.copilot-content');
    const copilotCloseBtn = document.querySelector('.copilot-close-btn');
    
    // 自动调整文本区域高度
    copilotInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.value.trim() === '') {
            this.style.height = 'auto';
        }
    });
    
    // 发送按钮点击事件
    copilotSendBtn.addEventListener('click', function() {
        sendMessage();
    });
    
    // 按Enter键发送消息（Shift+Enter换行）
    copilotInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 关闭按钮点击事件
    copilotCloseBtn.addEventListener('click', function() {
        // 这里可以添加关闭或最小化Copilot的逻辑
        document.querySelector('.copilot-sidebar').classList.toggle('minimized');
    });
    
    // 工具按钮点击事件
    const toolButtons = document.querySelectorAll('.copilot-tool-btn');
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 这里可以添加工具按钮的功能
            const toolType = this.textContent.trim();
            if (toolType.includes('上下文')) {
                // 添加上下文功能
                copilotInput.value += ' #上下文 ';
                copilotInput.focus();
            } else if (toolType.includes('图片')) {
                // 添加图片功能
                // 这里可以添加上传图片的逻辑
                alert('图片上传功能待实现');
            }
        });
    });
    
    // 添加闪烁的光标效果
    const cursorBlink = document.createElement('span');
    cursorBlink.className = 'cursor-blink';
    copilotContent.querySelector('p').appendChild(cursorBlink);
    
    // 发送消息函数
    function sendMessage() {
        const message = copilotInput.value.trim();
        if (message) {
            // 创建用户消息元素
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'copilot-message user-message';
            userMessageDiv.innerHTML = `<p>${message}</p>`;
            copilotContent.appendChild(userMessageDiv);
            
            // 清空输入框
            copilotInput.value = '';
            copilotInput.style.height = 'auto';
            
            // 滚动到底部
            copilotContent.scrollTop = copilotContent.scrollHeight;
            
            // 模拟AI响应
            setTimeout(() => {
                // 创建AI响应元素
                const aiMessageDiv = document.createElement('div');
                aiMessageDiv.className = 'copilot-message ai-message';
                aiMessageDiv.innerHTML = `<p>我已经将右侧的格式栏替换为AI copilot功能，样式参考了图片中的布局。您可以继续与我交互，我会尽力帮助您完成任务。</p>`;
                copilotContent.appendChild(aiMessageDiv);
                
                // 滚动到底部
                copilotContent.scrollTop = copilotContent.scrollHeight;
            }, 1000);
        }
    }
}

// 检查元素是否在列表中
function isInsideList(element) {
    let parent = element;
    while (parent) {
        if (parent.tagName === 'UL' || parent.tagName === 'OL') {
            return true;
        }
        parent = parent.parentElement;
    }
    return false;
}

// 初始化复选框功能
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const textElement = this.nextElementSibling;
            if (this.checked) {
                textElement.style.textDecoration = 'line-through';
                textElement.style.color = '#999';
            } else {
                textElement.style.textDecoration = 'none';
                textElement.style.color = '#333';
            }
            
            // 保存更改
            saveChanges();
        });
        
        // 初始化已选中的复选框样式
        if (checkbox.checked) {
            const textElement = checkbox.nextElementSibling;
            textElement.style.textDecoration = 'line-through';
            textElement.style.color = '#999';
        }
    });
}

// 保存更改（模拟）
function saveChanges() {
    // 这里可以添加实际的保存逻辑，例如发送到服务器
    console.log('内容已更新，准备保存...');
    // 可以添加自动保存指示器
    showSaveIndicator();
}

// 显示保存指示器
function showSaveIndicator() {
    // 创建或更新保存指示器
    let saveIndicator = document.getElementById('save-indicator');
    if (!saveIndicator) {
        saveIndicator = document.createElement('div');
        saveIndicator.id = 'save-indicator';
        saveIndicator.style.position = 'fixed';
        saveIndicator.style.bottom = '20px';
        saveIndicator.style.right = '20px';
        saveIndicator.style.padding = '8px 12px';
        saveIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        saveIndicator.style.color = '#fff';
        saveIndicator.style.borderRadius = '4px';
        saveIndicator.style.fontSize = '14px';
        saveIndicator.style.transition = 'opacity 0.3s';
        document.body.appendChild(saveIndicator);
    }
    
    // 显示保存状态
    saveIndicator.textContent = '正在保存...';
    saveIndicator.style.opacity = '1';
    
    // 模拟保存完成
    setTimeout(() => {
        saveIndicator.textContent = '已保存';
        setTimeout(() => {
            saveIndicator.style.opacity = '0';
        }, 1500);
    }, 800);
}