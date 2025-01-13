export const getRandomColor = () => {
  // 生成随机的 RGB 值
  const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
  };

  // 生成随机颜色,避免太暗或太亮
  const generateBalancedColor = () => {
    let rgb = getRandomRGB();
    
    // 确保颜色不会太暗
    while ((rgb.r + rgb.g + rgb.b) / 3 < 150) { // 提高最小亮度阈值
      rgb = getRandomRGB();
    }
    
    // 确保颜色不会太亮
    while ((rgb.r + rgb.g + rgb.b) / 3 > 220) {
      rgb = getRandomRGB();
    }

    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  };

  return generateBalancedColor();
};