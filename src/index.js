import avatar from './avatar.jpg';
import './index.scss'; // 全局引用

var img = new Image();
img.src = avatar;
img.classList.add('avatar');
img.classList.add('avatar1');

var root = document.getElementById('root');
root.append(img);
console.log('##########3')
// root.innerHTML = '<div class="iconfont icon-changjingguanli"></div>';
