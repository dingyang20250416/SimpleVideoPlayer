/**
 * 简单视频播放器 - 主程序
 * 包含视频播放、暂停、进度控制等功能
 */

document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const playBtn = document.getElementById('playBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const muteBtn = document.getElementById('muteBtn');
    const progressBar = document.getElementById('progressBar');
    const progressValue = document.getElementById('progressValue');
    
    // 视频元素
    let videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    
    // 初始化播放器
    initVideoPlayer();
    
    // 播放按钮点击事件
    playBtn.addEventListener('click', () => {
        if (!videoPlayer.src) {
            return;
        }
        
        if (videoPlayer.paused) {
            // 播放视频
            videoPlayer.play();
            updatePlayButton();
            showVideoPlaceholder();
        } else {
            // 暂停视频
            videoPlayer.pause();
            updatePlayButton();
            hideVideoPlaceholder();
        }
    });
    
    // 进度条点击事件
    progressBar.addEventListener('input', () => {
        const percentage = (progressBar.value / progressBar.max) * 100;
        progressValue.textContent = `${percentage.toFixed(0)}%`;
        
        // 更新视频的播放进度
        videoPlayer.currentTime = percentage;
    });
    
    // 音量按钮点击事件
    volumeBtn.addEventListener('click', () => {
        if (!videoPlayer) return;
        
        if (videoPlayer.volume !== 0) {
            videoPlayer.volume = 0;
            volumeBtn.textContent = '🔊 音量';
        } else {
            videoPlayer.volume = 1;
            volumeBtn.textContent = '🔇 静音';
        }
    });
    
    // 静音按钮点击事件
    muteBtn.addEventListener('click', () => {
        if (!videoPlayer) return;
        
        videoPlayer.muted = !videoPlayer.muted;
        if (videoPlayer.muted) {
            muteBtn.textContent = '🔇 静音';
        } else {
            muteBtn.textContent = '🔊 音量';
        }
    });
    
    // 视频结束事件
    videoPlayer.addEventListener('ended', () => {
        videoPlaceholder.textContent = '▶ 点击播放视频';
        videoPlaceholder.innerHTML = '<span>📹</span><p>点击播放视频</p>';
        videoPlaceholder.style.display = 'block';
        progressBar.value = 0;
        progressValue.textContent = '0%';
        videoPlayer.play();
        updatePlayButton();
    });
    
    // 视频加载完成事件
    videoPlayer.addEventListener('loadedmetadata', () => {
        showVideoPlaceholder();
        videoPlaceholder.style.display = 'none';
        videoPlaceholder.className = 'video-placeholder hidden';
    });
    
    // 视频开始播放事件
    videoPlayer.addEventListener('play', () => {
        videoPlaceholder.style.display = 'none';
        videoPlaceholder.className = 'video-placeholder hidden';
    });
    
    // 视频暂停事件
    videoPlayer.addEventListener('pause', () => {
        videoPlaceholder.style.display = 'block';
        videoPlaceholder.className = 'video-placeholder';
    });
    
    // 更新播放按钮状态
    function updatePlayButton() {
        if (videoPlayer.paused) {
            playBtn.textContent = '⏸ 暂停';
            playBtn.classList.add('paused');
        } else {
            playBtn.textContent = '▶ 播放';
            playBtn.classList.remove('paused');
        }
    }
    
    // 显示视频占位符
    function showVideoPlaceholder() {
        if (videoPlaceholder.style.display !== 'none') {
            return;
        }
        
        videoPlaceholder.innerHTML = '<span>📹</span><p>点击播放视频</p>';
        videoPlaceholder.style.display = 'flex';
    }
    
    // 隐藏视频占位符
    function hideVideoPlaceholder() {
        if (videoPlaceholder.style.display !== 'none') {
            return;
        }
        
        videoPlaceholder.innerHTML = '';
        videoPlaceholder.style.display = 'none';
        videoPlaceholder.className = 'video-placeholder hidden';
    }
    
    // 视频加载完成后显示占位符
    videoPlayer.addEventListener('loadedmetadata', () => {
        showVideoPlaceholder();
        videoPlaceholder.style.display = 'flex';
        videoPlaceholder.className = 'video-placeholder';
    });
    
    // 视频播放完成后更新占位符
    videoPlayer.addEventListener('ended', () => {
        hideVideoPlaceholder();
        videoPlaceholder.style.display = 'none';
        videoPlaceholder.className = 'video-placeholder hidden';
    });
    
    // 监听浏览器窗口大小变化
    window.addEventListener('resize', () => {
        if (videoPlayer) {
            videoPlayer.resize();
        }
    });
    
    // 添加一些额外的交互效果
    document.body.addEventListener('click', () => {
        if (videoPlayer) {
            videoPlayer.play();
        }
    }, { once: true });
    
    console.log('视频播放器已初始化');
});