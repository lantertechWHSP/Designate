export class ColorGenerator {
    private colors:string[] = [
        '#0c7fbb',
        '#de4443',
        '#77b559',

        '#dc7a30',
        '#e8b231',
        '#861cc3'
    ];
    private index:number = 0
    private cycleIndex:number = 0;
    private goldenRatioConjugate:number = 1.618;

    constructor() {
    }

    public reset() : void {
        this.index = 0;
        this.cycleIndex = 0;
    }

    // Return the default colors
    public getPredefinedColors() : any {
        return {
            blue: this.colors[0],
            red: this.colors[1],
            green: this.colors[2],
            orange: this.colors[3],
            yellow: this.colors[4],
            purple: this.colors[5]
        };
    }

    public next() : string {
        let hslToRgb = (object) => {
            let r;
            let g;
            let b;
            let h = object.h;
            let s = object.s;
            let l = object.l;

            if(s === 0) {
                r = g = b = l; // achromatic
            }
            else {
                let hue2rgb = (p, q, t) => {
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        };

        let rgbToHsl = (object) => {
            let r = object.r;
            let g = object.g;
            let b = object.b;

            r /= 255;
            g /= 255;
            b /= 255;
            let max = Math.max(r, g, b);
            let min = Math.min(r, g, b);
            let h;
            let s;
            let l;
            h = s = l = (max + min) / 2;

            if(max === min) {
                h = s = 0; // achromatic
            }
            else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h: h,
                s: s,
                l: l
            };
        };

        let hexColorToRgbObject = (hexColor) => {
            let regex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
            if(regex.test(hexColor)) {
                let r = parseInt(hexColor.substr(1, 2), 16);
                let g = parseInt(hexColor.substr(3, 2), 16);
                let b = parseInt(hexColor.substr(5, 2), 16);

                return {
                    r: r,
                    g: g,
                    b: b
                };
            }
            return null;
        };

        let rgbToHex = (object) => {
            let componentToHex = (color) => {
                let hex = color.toString(16);
                return hex.length == 1 ? '0' + hex : hex;
            };

            return '#' + componentToHex(object.r) + componentToHex(object.g) + componentToHex(object.b);
        };

        // Return the initial 12 colors
        if(this.index < this.colors.length) {
            const selectedColor = this.colors[this.index];

            this.index++;
            return selectedColor;
        }
        else {
            if((this.index % this.colors.length) === 0) {
                this.cycleIndex++;
            }

            let selectedColor = this.colors[this.index % this.colors.length];
            let hsl = rgbToHsl(hexColorToRgbObject(selectedColor));

            // Retrieves a new hue relative to the predefined hue with a ±30° color angle.
            let getNewHue = (oldHue) => {
                let hueWheel = oldHue * 360; // Hue converted into degrees
                let offset = (this.goldenRatioConjugate * this.cycleIndex); // Multipliy the goldenRatioConjugate with the cycleIncrement
                offset %= 1; // Modulo operator that fits between 0–1
                offset = ((offset * 60) - 30); // Offset that is between ±60° of the color angle.
                hueWheel += offset;

                // Ensure a positive value for the wheel
                if(hueWheel < 0) {
                    hueWheel += 360;
                }

                return hueWheel / 360;
            };

            // Gets a new saturation that ranges between 20% to 100%
            let getNewSaturation = () => {
                let offset = (this.goldenRatioConjugate * this.index);
                offset %= 1;

                let value = 0.20 + (offset * 0.8);
                return value;
            };

            // Gets a new value that ranges between 25% to 75%
            let getNewLumination = () => {
                let offset = (this.goldenRatioConjugate * this.index);
                offset %= 1;

                let value = 0.25 + (offset * 0.5);
                return value;
            };

            hsl.h = getNewHue(hsl.h);
            hsl.s = getNewSaturation();
            hsl.l = getNewLumination();

            let color = rgbToHex(hslToRgb(hsl));
            this.index++;
            return color;
        }
    }
}
