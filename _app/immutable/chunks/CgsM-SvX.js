var e=Math.sqrt(Math.PI),t=Math.SQRT2,n={SLOPE_MATCHED:2/e,CRISP:e},r={AIR:1,WATER:1.333,GLASS:1.5,SAPPHIRE:1.77,DIAMOND:2.417},i=.001;function a(e,t,n){let r=Math.min(t,n);return e>0?e<r?e:r:0}function o(e,t,n,r,i){let o=a(i,n,r),s=Math.abs(e)-(n-o),c=Math.abs(t)-(r-o),l=s>0?s:0,u=c>0?c:0,d=l===0&&u===0?0:Math.sqrt(l*l+u*u),f=s>c?s:c;return d+(f<0?f:0)-o}var s=.01;function c(e,t,n){if(n<=0)return e<t?e:t;let r=Math.max(n-Math.abs(e-t),0)/n;return(e<t?e:t)-r*r*n*.25}function l(e,t,n,r){let i=n[0];if(i===void 0)return 1/0;let a=o(e-i.x,t-i.y,i.halfWidth,i.halfHeight,i.radius);for(let i=1;i<n.length;i++){let s=n[i];s!==void 0&&(a=c(a,o(e-s.x,t-s.y,s.halfWidth,s.halfHeight,s.radius),r))}return a}function u(e){return e>0?e<1?e:1:0}var d=e=>{let t=1-u(e);return Math.sqrt(Math.max(0,1-t*t))},f=e=>{let t=1-u(e),n=t*t*t*t;return Math.sqrt(Math.sqrt(Math.max(0,1-n)))},p=e=>{let t=1-u(e);return 1-t*t},m=f,h=.18,g=Object.freeze({circle:d,squircle:f,convex:p,concave:m,bead:e=>{let t=u(e);if(t<=h)return Math.sin(Math.PI/2*(t/h));let n=(t-h)/(1-h);return .5*(1+Math.cos(Math.PI*n))}}),_=Object.freeze({circle:1,squircle:1,convex:1,concave:-1,bead:1});function v(e){let t=_[e];if(t===void 0)throw RangeError(`Unknown bezel profile "${String(e)}". Expected one of: ${Object.keys(g).join(`, `)}.`);return t}function y(e){let t=g[e];if(t===void 0)throw RangeError(`Unknown bezel profile "${String(e)}". Expected one of: ${Object.keys(g).join(`, `)}.`);return t}function b(e,t=n.SLOPE_MATCHED){return Math.tanh(t*e)}function x(e,r,i=n.SLOPE_MATCHED){return r>0?.5*(1+b(e*(1/(r*t)),i)):+(e>0)}function S(e,t,n=i){return(e(t+n)-e(t-n))/(2*n)}function C(e,t,n=i){let r=-S(e,t,n),a=Math.sqrt(r*r+1);return{x:r/a,y:1/a}}function w(e){return Math.atan2(Math.abs(e.x),e.y)}function T(e,t,n=i){return S(e,t,n)}function E(e,t,n,r=0){let i=t*Math.sin(e);if(i>=1||i<=-1)return 0;let a=e-Math.asin(i),o=n*Math.tan(a);if(r<=0)return o;let s=Math.sin(a)/t;return s>=1||s<=-1?o:o+r*Math.tan(Math.asin(s))}function D(e,t){let n=(e-t)/(e+t);return n*n}function O(e,t){let n=1-(e<0?0:e>1?1:e),r=n*n;return t+(1-t)*r*r*n}var k=200,A=.999;function j(e,t){return(t*t+e*e)/(2*e)}function ee(e,t,n){let r=Math.min(Math.abs(e),A*t);return r/Math.sqrt(t*t-r*r)*n}function M(e,t){let n=0;for(let r=0;r<=k;r++){let i=r/k*t,a=Math.min(i,A*e),o=a/Math.sqrt(e*e-a*a);n+=r===0||r===k?.5*o:o}return n/k}function N(e,t){let n=Number.isFinite(e)?e:0,r=Math.max(.01,t-1),i=j(Math.max(.01,Math.min(n,r)),t),a=M(i,t);return{radius:i,scale:a>0?.5/a:1}}var P={size:512,radius:24,depth:20,gap:0,viewDistance:0,ior:r.GLASS,strength:1,profile:`squircle`,edgeShape:`flat`,capBand:1,curvature:.06,glow:.05,glowExponent:2,edgeHighlight:.45,edgeWidth:3,specularAngle:45,backlight:1,caustic:0,causticWidth:.34};function F(e,t,n){return e===`bullnose`?2*t(n):1}function I(e){let t=Math.max(.01,Math.min(e.depth,Math.min(e.halfWidth,e.halfHeight)));return{depth:t,thickness:Math.max(.01,e.thickness??t)}}var L=.02;function R(e){return Math.max(4,Math.ceil(e*.4))}function z(e){return R(e.depth)}function B(e){let{thickness:t}=I(e),n=r.AIR/Math.max(1e-6,e.ior);return 2*(E(w(C(y(e.profile),L)),n,t,Math.max(0,e.gap??0))*F(e.edgeShape,y(e.profile),L)*Math.abs(e.strength))}var V=.14;function te(e){let t=a(e.radius,e.halfWidth,e.halfHeight),n=e.lobes,i=Math.max(0,e.blend??0),s=n===void 0||n.length===0?(n,r)=>o(n,r,e.halfWidth,e.halfHeight,t):(e,t)=>l(e,t,n,i),c=n===void 0||n.length===0||n.length===1&&n[0].x===0&&n[0].y===0,{depth:u,thickness:d}=I(e),f=r.AIR/Math.max(1e-6,e.ior),p=e.specularAngle*Math.PI/180,m=Math.max(.01,e.edgeWidth),h=m*.5,g=h*.5,_=Math.max(.01,m*Math.max(.02,Math.min(1,e.causticWidth??.34)))*.5,b=_*.5,S=N(Math.max(.01,e.curvature*Math.min(e.halfWidth,e.halfHeight)*.5),Math.min(e.halfWidth,e.halfHeight)),T=w(C(y(e.profile),V)),O=Math.max(1e-6,E(T,f,d,Math.max(0,e.gap??0))*F(e.edgeShape,y(e.profile),V));return{halfWidth:e.halfWidth,halfHeight:e.halfHeight,sdf:s,symmetric:c,radius:t,depth:u,thickness:d,gap:Math.max(0,e.gap??0),viewDistance:Math.max(0,e.viewDistance??0),pixelNorm:1/Math.max(1e-6,B(e)/2),eta:f,f0:D(r.AIR,e.ior),strength:e.strength,profileFn:y(e.profile),orientation:v(e.profile),edgeShape:e.edgeShape,capBand:Math.max(.05,e.capBand??1),curvature:Math.max(0,Math.min(1,e.curvature)),domeRadius:S.radius,domeScale:S.scale,glow:e.glow,glowExponent:e.glowExponent,edgeHighlight:e.edgeHighlight,edgeWidth:m,edgeHalf:h,edgeSigma:g,edgePeak:x(h,g),cosLight:Math.cos(p),sinLight:Math.sin(p),backlight:Math.max(0,Math.min(1,e.backlight??1)),caustic:Math.max(0,e.caustic??0),causticHalf:_,causticSigma:b,causticPeak:x(_,b),displacementNorm:1/O}}function ne(){return{dispX:0,dispY:0,specular:0,specularMirrorX:0,specularMirrorY:0,specularMirrorXY:0,inside:!1,sdf:0}}function H(e,t,n,r){let i=n.sdf(e,t);if(i>=0){r.dispX=0,r.dispY=0,r.specular=0,r.specularMirrorX=0,r.specularMirrorY=0,r.specularMirrorXY=0,r.inside=!1,r.sdf=i;return}let a=-i,o=s,c=n.sdf(e+o,t)-n.sdf(e-o,t),l=n.sdf(e,t+o)-n.sdf(e,t-o),u=Math.sqrt(c*c+l*l),d=u<1e-12?0:c/u,f=u<1e-12?0:l/u,p=n.capBand===1?n.depth:n.depth*(1+(n.capBand-1)*Math.abs(d)),m=a>=p?1:a/p,h=T(n.profileFn,m),g=Math.atan(h<0?-h:h),_=h<0?-1:1,v=E(g,n.eta,n.thickness,n.gap)*F(n.edgeShape,n.profileFn,m)*n.displacementNorm,y=(v>1?1:v)*n.orientation*_,b=n.curvature,S=g,C=d,w=f,D=d*y,k=f*y,A=-1;if(b>0){let r=Math.sqrt(e*e+t*t);A=r;let i=Math.atan(ee(r,n.domeRadius,n.domeScale));S=g*(1-b)+i*b;let a=E(i,n.eta,n.thickness,n.gap)*n.displacementNorm,o=a>1?1:a;if(r>1e-6){let n=e/r,i=t/r;D=D*(1-b)+n*o*b,k=k*(1-b)+i*o*b;let a=d*(1-b)+n*b,s=f*(1-b)+i*b,c=Math.sqrt(a*a+s*s);c>1e-6&&(C=a/c,w=s/c)}else D*=1-b,k*=1-b}if(n.viewDistance>0){let r=A<0?Math.sqrt(e*e+t*t):A;if(r>1e-6){let i=Math.atan(r/n.viewDistance),a=Math.sin(i)*n.eta;if(a<1&&a>-1){let o=Math.asin(a),s=n.thickness*Math.sin(i-o)/Math.cos(o)*n.pixelNorm;D-=e/r*s,k-=t/r*s}}}let j=Math.sqrt(D*D+k*k),M=j>1?n.strength/j:n.strength,N=D*M,P=k*M,I=0;if(n.edgeHighlight>0&&a<n.edgeWidth){let e=x(n.edgeHalf-a,n.edgeSigma);I=Math.max(0,(e-(1-n.edgePeak))/(2*n.edgePeak-1))}let L=0;if(n.caustic>0&&a<n.causticHalf*2){let e=x(n.causticHalf-a,n.causticSigma);L=Math.max(0,(e-(1-n.causticPeak))/(2*n.causticPeak-1))}let R=I>0||L>0?O(Math.cos(S),n.f0):0,z=n.glow>0?Math.sin(S):0,B=(e,t)=>{let r=e*C*n.cosLight+t*w*n.sinLight,i=r<0?-r:r,a=r<=0?i:i*n.backlight,o=r>0?i:0,s=0;return n.glow>0&&(s+=n.glow*(a*z)**+n.glowExponent),I>0&&(s+=n.edgeHighlight*I*a*R),L>0&&o>0&&(s+=n.caustic*L*o*R),s>1?1:s};r.dispX=N,r.dispY=P,r.specular=B(1,1),r.specularMirrorX=B(-1,1),r.specularMirrorY=B(1,-1),r.specularMirrorXY=B(-1,-1),r.inside=!0,r.sdf=i}function U(e){let t=.5+.5*e;return t<0?0:t>1?1:t}function W(e,t,n=0){e[t]=.5,e[t+1]=.5,e[t+2]=0,e[t+3]=n}function G(e,t){return e<=-t?1:e>=t?0:.5-e/(2*t)}function re(e){let{size:t}=e,n=t+1>>1,r=new Float32Array(t*t*4),i=te(e),a=ne(),o=z(e),s=e.halfWidth+o,c=e.halfHeight+o,l=2*s/t,u=2*c/t,d=.5*Math.hypot(l,u);if(!i.symmetric){for(let e=0;e<t;e++){let n=(e+.5)*u-c;for(let o=0;o<t;o++){let c=(o+.5)*l-s,u=(e*t+o)*4;H(c,n,i,a);let f=G(a.sdf,d);if(!a.inside){W(r,u,f>0?f:0);continue}r[u]=U(a.dispX),r[u+1]=U(a.dispY),r[u+2]=a.specular,r[u+3]=f}}return r}for(let e=0;e<n;e++){let o=t-1-e,f=(e+.5)*u-c;for(let c=0;c<n;c++){let n=t-1-c,u=(c+.5)*l-s,p=(e*t+c)*4,m=(e*t+n)*4,h=(o*t+c)*4,g=(o*t+n)*4;H(u,f,i,a);let _=G(a.sdf,d);if(!a.inside){let e=_>0?_:0;W(r,p,e),W(r,m,e),W(r,h,e),W(r,g,e);continue}let v=U(a.dispX),y=U(-a.dispX),b=U(a.dispY),x=U(-a.dispY),S=_,C=a.specular,w=a.specularMirrorX,T=a.specularMirrorY,E=a.specularMirrorXY;r[p]=v,r[p+1]=b,r[p+2]=C,r[p+3]=S,r[m]=y,r[m+1]=b,r[m+2]=w,r[m+3]=S,r[h]=v,r[h+1]=x,r[h+2]=T,r[h+3]=S,r[g]=y,r[g+1]=x,r[g+2]=E,r[g+3]=S}}return r}function ie(e,t,n,r){if(e.width<=0||e.height<=0||t.width<=0||t.height<=0)return null;let i=e.width/t.width,a=e.height/t.height,o=r===`cover`?Math.max(i,a):Math.min(i,a),s=r===`fill`?i:o,c=r===`fill`?a:o,l=(e.width-t.width*s)/2,u=(e.height-t.height*c)/2;return{x:(n.x-l)/s,y:(n.y-u)/c,width:n.width/s,height:n.height/c}}function ae(){return typeof process<`u`&&!1}var K=new Set;function q(e,t){ae()&&!K.has(e)&&(K.add(e),console.warn(`[caustic] ${t}`))}var oe=`
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  // Clip space is -1..1 with +Y up; UV is 0..1 with +Y down, which is the
  // orientation both the displacement map and an unflipped texture upload use.
  vUv = vec2((aPosition.x + 1.0) * 0.5, (1.0 - aPosition.y) * 0.5);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,se=`
precision highp float;

/**
 * The widest the channels may be split, in device pixels.
 *
 * A ceiling on 'aberration', which is a fraction of a bend that has no ceiling
 * of its own. Past a few pixels a split stops reading as a coloured fringe on
 * an edge and starts reading as the red and blue channels having been sampled
 * from different pictures, which is exactly what it is.
 */
const float MAX_SPLIT_PX = 6.0;

varying vec2 vUv;

uniform sampler2D uMap;
uniform sampler2D uSrc;

/** Where the pane sits on the source texture, in 0..1 texture coordinates. */
uniform vec2 uSrcOrigin;
uniform vec2 uSrcSize;

/** Pane size in device pixels, for turning a pixel offset into a UV offset. */
uniform vec2 uLayerPx;

/** Peak displacement, in device pixels. */
uniform float uPeak;

/** Frost radius, in device pixels. */
uniform float uFrost;

/** Tap spacing, in sigmas: sqrt(2) makes a 1,2,1 kernel's variance equal sigma squared. */
const float FROST_SPACING = 1.41421356;

/** Channel split at the rim, as a fraction of the offset. */
uniform float uAberration;

/** How much the rim highlight borrows the backdrop's colour, 0 to 1. */
uniform float uSpecTint;

/** How far the rim reaches for what it reflects, in device pixels. */
uniform float uReflect;

/** How strongly the bezel band mirrors, 0 to 1. */
uniform float uMirror;

/** Light direction, already oriented to the bend. */
uniform vec2 uLight;

/** How much of the mirroring the edge facing away from the light keeps. */
uniform float uBacklight;

/** Light gathered along the band and thrown back out at the rim. */
uniform float uEdgeGlow;

/** How large the backdrop appears through the pane. 1 is life size. */
uniform float uMagnify;

/** One displacement-map texel, in UV. Used to read the map's own gradient. */
uniform vec2 uMapTexel;

vec2 toSource(vec2 uv) {
  return uSrcOrigin + uv * uSrcSize;
}

/**
 * Source sample with optional frost.
 *
 * Frost is a standard deviation in CSS pixels, and it has to mean that here
 * because the SVG backend spends the same number directly as feGaussianBlur's
 * stdDeviation. One name, two backends, one unit.
 *
 * Nine taps, and the spacing is the whole correction. A 1,2,1 kernel at
 * spacing d has variance d*d/2, so sampling at d = sigma blurred at 0.707
 * sigma: every pane on the WebGL path came out under-frosted against the same
 * number on the SVG path. Spacing at sigma*sqrt(2) matches the variance, which
 * is the closest nine taps can get to a Gaussian and is now the right amount
 * of blur rather than a fixed fraction of it.
 *
 * Twenty-five taps at 0.8 sigma is a visibly better Gaussian, with the tails
 * this one truncates, and it was measured at 42.8fps against 59.8 on the video
 * player: nine panes over a live surface, re-sampled every frame. A third of
 * the frame budget is not worth tails on a blur that is mostly there to keep
 * glass from looking computer-generated. If a still surface ever wants the
 * better kernel it should ask for it by a uniform, not by everyone paying.
 */
vec3 sampleSource(vec2 uv) {
  if (uFrost <= 0.01) {
    return texture2D(uSrc, toSource(uv)).rgb;
  }
  vec2 grain = ((uFrost * FROST_SPACING) / uLayerPx) * uSrcSize;
  vec3 sum = vec3(0.0);
  float weight = 0.0;
  for (int iy = -1; iy <= 1; iy++) {
    for (int ix = -1; ix <= 1; ix++) {
      vec2 offset = vec2(float(ix), float(iy)) * grain;
      // Gaussian-ish: centre 4, edges 2, corners 1.
      float w = (ix == 0 ? 2.0 : 1.0) * (iy == 0 ? 2.0 : 1.0);
      sum += texture2D(uSrc, toSource(uv) + offset).rgb * w;
      weight += w;
    }
  }
  return sum / weight;
}

/**
 * Source sample, filtered across the area the lens squeezes into this pixel.
 *
 * The rim of a lens compresses a wide strip of the backdrop into a few pixels,
 * so neighbouring output pixels sample the source far apart. One bilinear tap
 * cannot represent that: it picks a single point out of the strip it is meant
 * to be averaging, and any edge in the backdrop crossing the rim comes out as a
 * staircase. That is what "the pixels break" looks like, and it is why raising
 * the map's resolution does nothing about it. The map was never the thing being
 * undersampled; the backdrop is.
 *
 * A GPU would normally solve this with mipmaps, which cannot be reached here:
 * the context is WebGL1, where mipmaps need power-of-two textures, and the
 * backdrop is a canvas at whatever size the layer happens to be.
 *
 * So the footprint is measured and averaged by hand. Four taps on the diagonals
 * rather than a 3x3, because the artefact is an edge being crossed rather than
 * noise, and four points spread across the strip resolve an edge as well as
 * nine at half the cost.
 *
 * @param uv     Where to sample.
 * @param radius Half the footprint, in UV. Zero takes the single cheap tap.
 */
vec3 sampleFiltered(vec2 uv, float radius) {
  if (radius < 0.0002) return sampleSource(uv);
  vec2 r = vec2(radius) * 0.7071;
  return 0.25 * (
    sampleSource(uv + vec2( r.x,  r.y)) +
    sampleSource(uv + vec2(-r.x,  r.y)) +
    sampleSource(uv + vec2( r.x, -r.y)) +
    sampleSource(uv + vec2(-r.x, -r.y)));
}

void main() {
  vec4 m = texture2D(uMap, vUv);

  // Alpha is the pane's shape, so outside the rounded rect there is nothing to
  // draw. Discarding rather than blending keeps the corners genuinely empty,
  // which matters here because every pane shares one canvas: a blended
  // transparent-black corner would darken whatever it overlaps.
  if (m.a <= 0.004) {
    discard;
  }

  /* Scale the whole backdrop about the pane's centre, before the bezel bends
   * anything. Dividing the centred coordinate by the factor means a factor
   * below 1 reaches for a *larger* area of the source, which lands inside the
   * same pane and therefore reads as smaller. Done here rather than folded into
   * the offset because it is a property of the glass as a whole, not of its
   * edge: the middle has to shrink too, and a bezel term can only ever act
   * inside its own band. */
  vec2 base = uMagnify == 1.0 ? vUv : (vUv - 0.5) / max(0.05, uMagnify) + 0.5;

  vec2 d = (m.rg - 0.5) * 2.0;
  vec2 offset = (d * uPeak) / uLayerPx;

  // Nothing may sample further than half the pane.
  //
  // Not a taste call. A displacement larger than the pane is not a strong lens,
  // it is a meaningless one: the sample lands outside anything the pane covers,
  // so the result stops being a bend and becomes an arbitrary piece of the
  // texture pasted in. The map can ask for that whenever the rim slope is very
  // steep, which the bead profile reaches at 85 degrees, and every control that
  // scales the bend can then push it there. Clamping the length rather than the
  // components keeps the direction exactly as the optics computed it.
  float reach = length(offset);
  if (reach > 0.5) offset *= 0.5 / reach;

  /* How much backdrop this one pixel is standing over.
   *
   * The map is read one texel either side to get the rate the displacement is
   * changing at, which is exactly the rate at which neighbouring output pixels
   * pull apart in the source. Across the flat middle of a pane it is zero and
   * this costs four texture reads and nothing else; in the bezel band it is
   * large, and it is the only place the artefact lives. */
  vec2 dmx = texture2D(uMap, vUv + vec2(uMapTexel.x, 0.0)).rg
           - texture2D(uMap, vUv - vec2(uMapTexel.x, 0.0)).rg;
  vec2 dmy = texture2D(uMap, vUv + vec2(0.0, uMapTexel.y)).rg
           - texture2D(uMap, vUv - vec2(0.0, uMapTexel.y)).rg;
  // Per map texel, converted to per output pixel, in the same UV the offset is.
  vec2 perPxX = dmx * uPeak / (uMapTexel.x * uLayerPx * uLayerPx.x);
  vec2 perPxY = dmy * uPeak / (uMapTexel.y * uLayerPx * uLayerPx.y);
  // Half the footprint, and capped: where the bend is extreme the honest
  // footprint is most of the pane, and averaging that is a grey smear rather
  // than a filtered edge.
  float footprint = min(0.5 * (length(perPxX) + length(perPxY)), 0.02);

  /* Dispersion, measured in device pixels rather than in UV.
   *
   * Splitting the channels means sampling three times, and the three results
   * are identical wherever the split is smaller than the pixel grid can show.
   * That is not a rare case: the offset is neutral across the whole flat middle
   * of a pane, so most of the surface would be paying three fetches to compute
   * one answer three times. Below a quarter of a pixel the cheap branch is not
   * an approximation, it is the same colour for a third of the work.
   *
   * The split is also *capped*, which it was not. 'aberration' is a fraction of
   * the bend, and the bend has no small upper bound, so a strong lens split the
   * channels by tens or hundreds of pixels: the red and blue samples then come
   * from unrelated parts of the texture and the result is not a fringe but a
   * flat field of cyan or yellow. Real dispersion through a few millimetres of
   * glass is a fraction of a degree, so a handful of pixels is already generous
   * and anything past it is not a stronger effect, it is a broken one.
   */
  vec2 dispersion = offset * uAberration;
  float splitPx = length(dispersion * uLayerPx);
  if (splitPx > MAX_SPLIT_PX) dispersion *= MAX_SPLIT_PX / splitPx;

  vec3 colour;
  if (uAberration <= 0.0001 || splitPx < 0.25) {
    colour = sampleFiltered(base + offset, footprint);
  } else {
    // Blue bends hardest, red least, which is the direction real dispersion
    // runs. Reversing it looks subtly wrong without being obviously wrong.
    colour.r = sampleFiltered(base + offset - dispersion, footprint).r;
    colour.g = sampleFiltered(base + offset, footprint).g;
    colour.b = sampleFiltered(base + offset + dispersion, footprint).b;
  }

  // The rim, tinted by what it reflects.
  //
  // At grazing angles glass is very nearly a mirror, so the edge is the colour
  // of its surroundings rather than white. Which surroundings is the part worth
  // getting right: a mirror at the rim shows what lies *along* it, not what is
  // directly behind it, so the sample is taken further out along the same
  // direction the bend runs in. At uReflect = 0 this collapses to the local
  // colour, which is the older behaviour.
  float bend = clamp(length(d), 0.0, 1.0);
  vec3 reflected = colour;
  if (uReflect > 0.01 && (uMirror > 0.001 || m.b > 0.002) && bend > 0.004) {
    reflected = sampleSource(base + (d / bend) * (uReflect / uLayerPx));
  }

  // The band mirrors, and the two long edges do not mirror equally. Light
  // arrives from one side: the edge facing it carries a broad smear of whatever
  // lies along it, and the edge facing away keeps only what crossed the glass.
  // An unsigned weight here lights both the same, which is the one thing a
  // reference render of this material never does.
  float side = bend > 0.004 ? dot(d / bend, uLight) : 0.0;
  float facing = side >= 0.0 ? 1.0 : uBacklight;
  colour = mix(colour, reflected, clamp(uMirror * bend * bend * facing, 0.0, 1.0));

  // The rim highlight on top of it, tinted by the same reflection.
  vec3 tint = mix(vec3(1.0), reflected, uSpecTint);
  colour += m.b * tint;

  // Light gathered across the band and thrown back out at the rim.
  //
  // Added rather than mixed, so the result can be brighter than anything that
  // went into it: that is the whole point, since a mixed colour cannot glow.
  // Cubed, so it is concentrated hard against the rim and gone by the time the
  // band reaches the flat middle. Strongest on the edge facing *away* from the
  // light, because this is light that crossed the glass and came out the far
  // side, which is where a real capsule carries its brightest line.
  if (uEdgeGlow > 0.001 && bend > 0.004) {
    float exiting = side < 0.0 ? 1.0 : uBacklight;
    colour += uEdgeGlow * bend * bend * bend * exiting * reflected;
  }

  // Premultiplied, matching the context's premultipliedAlpha: true.
  gl_FragColor = vec4(colour * m.a, m.a);
}
`,ce=new Float32Array([-1,-1,1,-1,-1,1,1,1]),J=[`uMap`,`uSrc`,`uSrcOrigin`,`uSrcSize`,`uLayerPx`,`uPeak`,`uFrost`,`uAberration`,`uSpecTint`,`uReflect`,`uMirror`,`uLight`,`uBacklight`,`uEdgeGlow`,`uMagnify`,`uMapTexel`],le=16;function Y(){let e={};for(let t of J)e[t]=null;return e}function X(e,t,n){let r=e.createShader(t);return r===null?null:(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(q(`gl-compile`,`a shader failed to compile, so glass over media will not render: ${e.getShaderInfoLog(r)??`no log`}`),e.deleteShader(r),null))}var Z=new Float32Array(1),ue=new Uint32Array(Z.buffer);function de(e){Z[0]=e;let t=ue[0]??0,n=t>>>16&32768,r=t>>>23&255,i=t&8388607;if(r===255)return n|31744|(i===0?0:512);let a=r-127+15;return a>=31?n|31743:a<=0?n:n|a<<10|i>>>13}function fe(e){let t=new Uint16Array(e.length);for(let n=0;n<e.length;n++)t[n]=de(e[n]??0);return t}function pe(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=(e[n]??0)*255+.5;t[n]=r<0?0:r>255?255:r|0}return t}function Q(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR)}var me={setMap:()=>{},setOptics:()=>{},setRect:()=>{},invalidate:()=>{},release:()=>{}},he=class{#e;#t;#n=new Set;#r=null;#i=null;#a=null;#o=null;#s=null;#c=Y();#l=-1;#u=void 0;#d=0;#f=0;#p=0;#m=0;#h=!1;#g=!1;#_=!0;#v=!0;#y=1;#b=0;#x=0;#S;#C=[];constructor(e,t){this.#e=e,this.#t=t,this.#y=$(),e.addEventListener(`webglcontextlost`,this.#w,!1),e.addEventListener(`webglcontextrestored`,this.#T,!1),this.#E(),this.#S=typeof IntersectionObserver==`function`?new IntersectionObserver(([e])=>{e!==void 0&&(this.#v=e.isIntersecting,e.isIntersecting&&(this.#_=!0))}):null,this.#S?.observe(e);let n=()=>{document.visibilityState===`visible`&&(this.#_=!0,this.#O())};document.addEventListener(`visibilitychange`,n),this.#C.push(()=>document.removeEventListener(`visibilitychange`,n)),this.#M(),this.#O()}get available(){return this.#r!==null}setSize(e,t){(this.#b!==e||this.#x!==t)&&(this.#b=e,this.#x=t,this.#D(),this.#_=!0)}addPane(){if(this.#r===null||this.#g)return me;let e={rect:{x:0,y:0,width:0,height:0},overhang:0,mapData:null,mapSize:0,texture:null,optics:{peak:0,frost:0,specularTint:0,aberration:0,reflect:0,mirror:0,light:[0,1],backlight:1,edgeGlow:0,magnify:1},released:!1};return this.#n.add(e),this.#_=!0,{setMap:(t,n)=>{e.mapData=t,e.mapSize=n,e.texture!==null&&this.#r?.deleteTexture(e.texture),e.texture=null,this.#_=!0},setOptics:t=>{e.optics=t,this.#_=!0},setRect:(t,n)=>{e.rect=t,e.overhang=n,this.#_=!0},invalidate:()=>{this.#_=!0},release:()=>{e.released||(e.released=!0,e.texture!==null&&this.#r?.deleteTexture(e.texture),this.#n.delete(e),this.#_=!0)}}}destroy(){if(this.#g)return;this.#g=!0,cancelAnimationFrame(this.#m),this.#S?.disconnect();for(let e of this.#C)e();this.#e.removeEventListener(`webglcontextlost`,this.#w),this.#e.removeEventListener(`webglcontextrestored`,this.#T);let e=this.#r;if(e!==null){for(let t of this.#n)t.texture!==null&&e.deleteTexture(t.texture);e.deleteTexture(this.#s),e.deleteBuffer(this.#o),e.deleteProgram(this.#a)}this.#n.clear(),this.#r=null}#w=e=>{e.preventDefault(),this.#h=!0;for(let e of this.#n)e.texture=null;this.#f=0,this.#p=0,this.#u=void 0,this.#d=0,q(`gl-lost`,`the WebGL context was lost; glass over media will restore itself when the browser returns it`)};#T=()=>{this.#h=!1,this.#E(),this.#_=!0,this.#O()};#E(){if(this.#r!==null&&this.#r.isContextLost()){this.#r.getExtension(`WEBGL_lose_context`)?.restoreContext();return}let e=this.#e.getContext(`webgl`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1})??this.#e.getContext(`experimental-webgl`);if(e===null){this.#r=null;return}if(e.isContextLost()){this.#r=e,e.getExtension(`WEBGL_lose_context`)?.restoreContext();return}this.#r=e;let t=X(e,e.VERTEX_SHADER,oe),n=X(e,e.FRAGMENT_SHADER,se),r=e.createProgram();if(t===null||n===null||r===null){this.#r=null;return}if(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),!e.getProgramParameter(r,e.LINK_STATUS)){q(`gl-link`,`the glass program failed to link: ${e.getProgramInfoLog(r)??`no log`}`),this.#r=null;return}this.#a=r,e.useProgram(r);let i=e.createBuffer();if(i===null){this.#r=null;return}this.#o=i,e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,ce,e.STATIC_DRAW);let a=e.getAttribLocation(r,`aPosition`);this.#l=a,e.enableVertexAttribArray(a),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0);let o=Y();for(let t of J)o[t]=e.getUniformLocation(r,t);this.#c=o,e.uniform1i(o.uMap,0),e.uniform1i(o.uSrc,1),this.#s=e.createTexture(),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.#s),Q(e);let s=e.getExtension(`OES_texture_half_float`),c=e.getExtension(`OES_texture_half_float_linear`);this.#i=s!==null&&c!==null?s.HALF_FLOAT_OES:null,e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0),this.#D()}#D(){let e=Math.max(1,Math.round(this.#b*this.#y)),t=Math.max(1,Math.round(this.#x*this.#y));(this.#e.width!==e||this.#e.height!==t)&&(this.#e.width=e,this.#e.height=t)}#O(){this.#m!==0||this.#r===null||this.#g||(this.#m=requestAnimationFrame(this.#k))}#k=()=>{this.#m=0,!this.#g&&document.visibilityState!==`hidden`&&(this.#v&&!this.#h&&this.#A(),this.#O())};#A(){let e=this.#r;if(e===null||this.#a===null||this.#o===null||this.#b===0||this.#x===0)return;if(this.#n.size===0){if(!this.#_)return;e.viewport(0,0,this.#e.width,this.#e.height),e.clear(e.COLOR_BUFFER_BIT),this.#_=!1;return}let t=this.#t();if(t===null||!t.live&&!this.#_)return;let n=performance.now(),r=t.version!==void 0&&t.version===this.#u&&n-this.#d<le;if(!r||this.#_){if(e.useProgram(this.#a),e.bindBuffer(e.ARRAY_BUFFER,this.#o),e.enableVertexAttribArray(this.#l),e.vertexAttribPointer(this.#l,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.#s),!r){let{width:r,height:i}=t.natural,a=r!==this.#f||i!==this.#p;try{a?(e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.image),this.#f=r,this.#p=i):e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,t.image)}catch{q(`gl-tainted`,`the media behind a glass surface is cross-origin without CORS headers, so it cannot be refracted. Serve it same-origin, or set crossorigin on the element.`),this.#_=!1,this.#f=0,this.#p=0;return}this.#u=t.version,this.#d=n}e.viewport(0,0,this.#e.width,this.#e.height),e.clear(e.COLOR_BUFFER_BIT);for(let e of this.#n)this.#j(e,t);this.#_=!1}}#j(e,t){let n=this.#r;if(n===null||e.mapData===null||e.rect.width<=0||e.rect.height<=0)return;if(e.texture===null){e.texture=n.createTexture(),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.texture),Q(n);let t=this.#i;if(t!==null&&e.mapData instanceof Float32Array)n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e.mapSize,e.mapSize,0,n.RGBA,t,fe(e.mapData));else{let t=e.mapData instanceof Float32Array?pe(e.mapData):new Uint8Array(e.mapData.buffer,e.mapData.byteOffset,e.mapData.byteLength);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e.mapSize,e.mapSize,0,n.RGBA,n.UNSIGNED_BYTE,t)}}let r=e.overhang,i={x:e.rect.x-r,y:e.rect.y-r,width:e.rect.width+r*2,height:e.rect.height+r*2},a=ie(t.box,t.natural,{x:i.x-t.offsetX,y:i.y-t.offsetY,width:i.width,height:i.height},t.objectFit);if(a===null)return;let o=this.#y,s=Math.max(1,Math.round(i.width*o)),c=Math.max(1,Math.round(i.height*o)),l=this.#c;n.uniform2f(l.uSrcOrigin,a.x/t.natural.width,a.y/t.natural.height),n.uniform2f(l.uSrcSize,a.width/t.natural.width,a.height/t.natural.height),n.uniform2f(l.uLayerPx,s,c),n.uniform1f(l.uPeak,e.optics.peak*o),n.uniform1f(l.uFrost,e.optics.frost*o),n.uniform1f(l.uAberration,e.optics.aberration),n.uniform1f(l.uSpecTint,e.optics.specularTint),n.uniform1f(l.uReflect,e.optics.reflect*o),n.uniform1f(l.uMirror,e.optics.mirror),n.uniform2f(l.uLight,e.optics.light[0],e.optics.light[1]),n.uniform1f(l.uBacklight,e.optics.backlight),n.uniform1f(l.uEdgeGlow,e.optics.edgeGlow),n.uniform1f(l.uMagnify,e.optics.magnify);let u=e.mapSize>0?e.mapSize:1;n.uniform2f(l.uMapTexel,1/u,1/u),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.texture),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.#s),n.viewport(Math.round(i.x*o),this.#e.height-Math.round(i.y*o)-c,s,c),n.drawArrays(n.TRIANGLE_STRIP,0,4)}#M(){if(typeof window>`u`||typeof window.matchMedia!=`function`)return;let e=window.matchMedia(`(resolution: ${$()}dppx)`),t=()=>{this.#g||(this.#y=$(),this.#D(),this.#_=!0,e.removeEventListener(`change`,t),this.#M())};e.addEventListener(`change`,t),this.#C.push(()=>e.removeEventListener(`change`,t))}};function $(){return typeof window>`u`?1:Math.max(1,window.devicePixelRatio||1)}export{P as DEFAULT_MAP_PARAMS,he as GlassSurface,re as computeDisplacementMapFloat,R as mapPadding,B as maxDisplacementPixels};