/**
 * 通过 rem 使页面和等比例缩放
 * 
 * 实现逻辑
 * 1. 将基数设置成 100，通过公式 rem / clientWidth = 100 / 设计图宽，得出 rem.
 * 2. css 中的值就是 实际的长度 / 100，加上单位 rem. 如：
 *  div { width: 1rem } 1rem = (设计图的实际尺寸 / 100)rem.
 *  通过将基数设置成 100，可以方便的计算出 css 的大小
 *
 * @param {number?} width 	设计图宽
 * @param {number?} height 	设计图宽
 * @param {number?} max 		最大宽 (达到时不再缩放)
 * 
 */

export default function rem (width, height, max) {
  const docEl = document.documentElement
  const base = 100
  let design, client

  if (typeof width === 'number' && !height) {
    design = width;
  }

  if (!width && typeof height === 'number') {
    design = height;
  }

  function handleResize() {
    client = docEl[width ? 'clientWidth' : 'clientHeight'];

    // 以宽为标准，达到最大尺寸时，不变
    if (width && (max || (max = width)) && (client >= max)) {
      client = max;
    }

    docEl.style.fontSize = (base / design) * client + 'px';
  }

  window.addEventListener('resize', handleResize, false);

  handleResize();
}

