export function generateColors(baseColor: string, numColors: number): string[] {
  // 将十六进制颜色转换为 RGB 值
  function hexToRgb(hex: string): [number, number, number] {
	hex = hex.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;
	return [r, g, b];
  }

  // 将 RGB 值转换为十六进制颜色
  function rgbToHex(r: number, g: number, b: number): string {
	const toHex = (c: number) => {
	  const hex = Math.round(c * 255).toString(16);
	  return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // 将 RGB 转换为 HSV
  function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;
	const s = max === 0 ? 0 : d / max;
	const v = max;

	if (d!== 0) {
	  switch (max) {
		case r:
		  h = ((g - b) / d) % 6;
		  break;
		case g:
		  h = ((b - r) / d) + 2;
		  break;
		case b:
		  h = ((r - g) / d) + 4;
		  break;
	  }
	  h *= 60;
	  if (h < 0) {
		h += 360;
	  }
	}
	return [h / 360, s, v];
  }

  // 将 HSV 转换为 RGB
  function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	let r: number;
	let g: number;
	let b: number;

	switch (i % 6) {
	  case 0:
		r = v;
		g = t;
		b = p;
		break;
	  case 1:
		r = q;
		g = v;
		b = p;
		break;
	  case 2:
		r = p;
		g = v;
		b = t;
		break;
	  case 3:
		r = p;
		g = q;
		b = v;
		break;
	  case 4:
		r = t;
		g = p;
		b = v;
		break;
	  case 5:
		r = v;
		g = p;
		b = q;
		break;
	  default:
		r = 0;
		g = 0;
		b = 0;
	}

	return [r, g, b];
  }

  const [baseR, baseG, baseB] = hexToRgb(baseColor);
  const [baseH, baseS, baseV] = rgbToHsv(baseR, baseG, baseB);
  const colors: string[] = [];

  // 采用黄金分割比例来调整色相，使颜色更分散
  const goldenRatio = (Math.sqrt(5) - 1) / 2;
  for (let i = 0; i < numColors; i++) {
	const newH = (baseH + i * goldenRatio) % 1;
	// 对饱和度和亮度进行微调
	const newS = Math.min(1, baseS + (Math.random() - 0.5) * 0.2);
	const newV = Math.min(1, baseV + (Math.random() - 0.5) * 0.2);
	const [newR, newG, newB] = hsvToRgb(newH, newS, newV);
	const newHex = rgbToHex(newR, newG, newB);
	colors.push(newHex);
  }

  return colors;
}