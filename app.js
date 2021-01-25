RGBA(`
            float channel(vec2 uv, float t) {
                float r = 0.19 - 0.1*t;
                float edge = (2.0 - t)*0.03;
                float k = 0.003*sin(t*3.1415);
                float d = length(uv - t*0.25) + k/uv.x + k/uv.y;
                return smoothstep(r + edge, r, d);
            }
            void main(){
                vec2 uv = gl_FragCoord.xy/resolution - 0.5;
                uv.x *= resolution.x/resolution.y;
                gl_FragColor.a = 1.0;
                float t = fract(time*0.2);//clamp((fract(time*0.3)-0.5)*1.5 + 0.25, 0.0, 1.0);
                 float rot = t*3.1415/2.;
                float cs = cos(rot);
                float sn = sin(rot);
                uv *= mat2(cs, sn, -sn, cs);
                uv = abs(fract(uv*(4.0-t*2.0))-0.5);
                float dUv = sin(t*3.1415);
                gl_FragColor.r = channel(uv, t);
                gl_FragColor.g = channel(uv+0.01*dUv, t);
                gl_FragColor.b = channel(uv+0.02*dUv, t);
    }`, {record:false});