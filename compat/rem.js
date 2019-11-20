/**
 * 设置 rem
 *
 * @param {number?} width 	设计图宽
 * @param {number?} height 	设计图宽
 * @param {number?} max 		width 最大值
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

