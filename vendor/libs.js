var C0=0,om=1,R0=2;var fg=1,P0=2,dn=3,Wn=0,Zt=1,mn=2,Hn=0,cr=1,vf=2,am=3,lm=4,I0=5,bs=100,D0=101,L0=102,O0=103,U0=104,N0=200,F0=201,B0=202,z0=203,_f=204,bf=205,k0=206,V0=207,H0=208,G0=209,W0=210,X0=211,q0=212,Y0=213,$0=214,Mf=0,Sf=1,wf=2,pr=3,Tf=4,Ef=5,Af=6,Cf=7,dg=0,Z0=1,K0=2,Gn=0,J0=1,j0=2,Q0=3,eb=4,tb=5,ib=6,nb=7;var pg=300,mr=301,gr=302,Rf=303,Pf=304,ol=306,If=1e3,Ss=1001,Df=1002,Ni=1003,sb=1004;var oa=1005;var qi=1006,Hh=1007;var ws=1008;var vn=1009,mg=1010,gg=1011,Ao=1012,Gd=1013,Es=1014,gn=1015,Do=1016,Wd=1017,Xd=1018,xr=1020,xg=35902,yg=1021,vg=1022,Ui=1023,_g=1024,bg=1025,ur=1026,yr=1027,Mg=1028,qd=1029,Sg=1030,Yd=1031;var $d=1033,Ua=33776,Na=33777,Fa=33778,Ba=33779,Lf=35840,Of=35841,Uf=35842,Nf=35843,Ff=36196,Bf=37492,zf=37496,kf=37808,Vf=37809,Hf=37810,Gf=37811,Wf=37812,Xf=37813,qf=37814,Yf=37815,$f=37816,Zf=37817,Kf=37818,Jf=37819,jf=37820,Qf=37821,za=36492,ed=36494,td=36495,wg=36283,id=36284,nd=36285,sd=36286;var ka=2300,rd=2301,Gh=2302,cm=2400,um=2401,hm=2402;var rb=3200,ob=3201;var ab=0,lb=1,kn="",vi="srgb",br="srgb-linear",al="linear",tt="srgb";var Ys=7680;var fm=519,cb=512,ub=513,hb=514,Tg=515,fb=516,db=517,pb=518,mb=519,dm=35044;var pm="300 es",xn=2e3,Va=2001,Xn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mm=1234567,hr=Math.PI/180,Co=180/Math.PI;function Mr(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function $t(i,e,t){return Math.max(e,Math.min(t,i))}function Zd(i,e){return(i%e+e)%e}function gb(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function xb(i,e,t){return i!==e?(t-i)/(e-i):0}function To(i,e,t){return(1-t)*i+t*e}function yb(i,e,t,n){return To(i,e,1-Math.exp(-t*n))}function vb(i,e=1){return e-Math.abs(Zd(i,e*2)-e)}function _b(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function bb(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Mb(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sb(i,e){return i+Math.random()*(e-i)}function wb(i){return i*(.5-Math.random())}function Tb(i){i!==void 0&&(mm=i);let e=mm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Eb(i){return i*hr}function Ab(i){return i*Co}function Cb(i){return(i&i-1)===0&&i!==0}function Rb(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pb(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ib(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*h,l*f,a*c);break;case"YZY":i.set(l*f,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*f,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ar(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Db={DEG2RAD:hr,RAD2DEG:Co,generateUUID:Mr,clamp:$t,euclideanModulo:Zd,mapLinear:gb,inverseLerp:xb,lerp:To,damp:yb,pingpong:vb,smoothstep:_b,smootherstep:bb,randInt:Mb,randFloat:Sb,randFloatSpread:wb,seededRandom:Tb,degToRad:Eb,radToDeg:Ab,isPowerOfTwo:Cb,ceilPowerOfTwo:Rb,floorPowerOfTwo:Pb,setQuaternionFromProperEuler:Ib,normalize:qt,denormalize:ar},je=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Oe=class i{constructor(e,t,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],v=s[1],M=s[4],y=s[7],A=s[2],T=s[5],R=s[8];return r[0]=o*x+a*v+l*A,r[3]=o*m+a*M+l*T,r[6]=o*d+a*y+l*R,r[1]=c*x+u*v+h*A,r[4]=c*m+u*M+h*T,r[7]=c*d+u*y+h*R,r[2]=f*x+p*v+g*A,r[5]=f*m+p*M+g*T,r[8]=f*d+p*y+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,g=t*h+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(s*c-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Wh.makeScale(e,t)),this}rotate(e){return this.premultiply(Wh.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Wh=new Oe;function Eg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ha(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lb(){let i=Ha("canvas");return i.style.display="block",i}var gm={};function So(i){i in gm||(gm[i]=!0,console.warn(i))}function Ob(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Ub(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Nb(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var qe={enabled:!0,workingColorSpace:br,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===tt&&(i.r=yn(i.r),i.g=yn(i.g),i.b=yn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===tt&&(i.r=fr(i.r),i.g=fr(i.g),i.b=fr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kn?al:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xm=[.64,.33,.3,.6,.15,.06],ym=[.2126,.7152,.0722],vm=[.3127,.329],_m=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bm=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[br]:{primaries:xm,whitePoint:vm,transfer:al,toXYZ:_m,fromXYZ:bm,luminanceCoefficients:ym,workingColorSpaceConfig:{unpackColorSpace:vi},outputColorSpaceConfig:{drawingBufferColorSpace:vi}},[vi]:{primaries:xm,whitePoint:vm,transfer:tt,toXYZ:_m,fromXYZ:bm,luminanceCoefficients:ym,outputColorSpaceConfig:{drawingBufferColorSpace:vi}}});var $s,od=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{$s===void 0&&($s=Ha("canvas")),$s.width=e.width,$s.height=e.height;let n=$s.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=$s}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ha("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=yn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yn(t[n]/255)*255):t[n]=yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fb=0,Ga=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fb++}),this.uuid=Mr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xh(s[o].image)):r.push(Xh(s[o]))}else r=Xh(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Xh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?od.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Bb=0,bi=class i extends Xn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ss,s=Ss,r=qi,o=ws,a=Ui,l=vn,c=i.DEFAULT_ANISOTROPY,u=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bb++}),this.uuid=Mr(),this.name="",this.source=new Ga(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case If:e.x=e.x-Math.floor(e.x);break;case Ss:e.x=e.x<0?0:1;break;case Df:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case If:e.y=e.y-Math.floor(e.y);break;case Ss:e.y=e.y<0?0:1;break;case Df:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bi.DEFAULT_IMAGE=null;bi.DEFAULT_MAPPING=pg;bi.DEFAULT_ANISOTROPY=1;var Tt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,y=(p+1)/2,A=(d+1)/2,T=(u+f)/4,R=(h+x)/4,C=(g+m)/4;return M>y&&M>A?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=T/n,r=R/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=C/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=C/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-x)/v,this.z=(f-u)/v,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ad=class extends Xn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new bi(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ga(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},_n=class extends ad{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Wa=class extends bi{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ni,this.minFilter=Ni,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ld=class extends bi{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ni,this.minFilter=Ni,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],f=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(h!==x||l!==f||c!==p||u!==g){let m=1-a,d=l*f+c*p+u*g+h*x,v=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){let A=Math.sqrt(M),T=Math.atan2(A,d*v);m=Math.sin(m*T)/A,a=Math.sin(a*T)/A}let y=a*v;if(l=l*m+f*y,c=c*m+p*y,u=u*m+g*y,h=h*m+x*y,m===1-a){let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*p-c*f,e[t+1]=l*g+u*f+c*h-a*p,e[t+2]=c*g+u*p+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),h=a(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($t(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qh.copy(this).projectOnVector(e),this.sub(qh)}reflect(e){return this.sub(qh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($t(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qh=new U,Mm=new qn,As=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Di):Di.fromBufferAttribute(r,o),Di.applyMatrix4(e.matrixWorld),this.expandByPoint(Di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),aa.copy(n.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Di),Di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yo),la.subVectors(this.max,yo),Zs.subVectors(e.a,yo),Ks.subVectors(e.b,yo),Js.subVectors(e.c,yo),On.subVectors(Ks,Zs),Un.subVectors(Js,Ks),ps.subVectors(Zs,Js);let t=[0,-On.z,On.y,0,-Un.z,Un.y,0,-ps.z,ps.y,On.z,0,-On.x,Un.z,0,-Un.x,ps.z,0,-ps.x,-On.y,On.x,0,-Un.y,Un.x,0,-ps.y,ps.x,0];return!Yh(t,Zs,Ks,Js,la)||(t=[1,0,0,0,1,0,0,0,1],!Yh(t,Zs,Ks,Js,la))?!1:(ca.crossVectors(On,Un),t=[ca.x,ca.y,ca.z],Yh(t,Zs,Ks,Js,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ln=[new U,new U,new U,new U,new U,new U,new U,new U],Di=new U,aa=new As,Zs=new U,Ks=new U,Js=new U,On=new U,Un=new U,ps=new U,yo=new U,la=new U,ca=new U,ms=new U;function Yh(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ms.fromArray(i,r);let a=s.x*Math.abs(ms.x)+s.y*Math.abs(ms.y)+s.z*Math.abs(ms.z),l=e.dot(ms),c=t.dot(ms),u=n.dot(ms);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var zb=new As,vo=new U,$h=new U,Cs=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):zb.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vo.subVectors(e,this.center);let t=vo.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vo,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($h.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vo.copy(e.center).add($h)),this.expandByPoint(vo.copy(e.center).sub($h))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},cn=new U,Zh=new U,ua=new U,Nn=new U,Kh=new U,ha=new U,Jh=new U,Ro=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cn.copy(this.origin).addScaledVector(this.direction,t),cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zh.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(Zh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ua),a=Nn.dot(this.direction),l=-Nn.dot(ua),c=Nn.lengthSq(),u=Math.abs(1-o*o),h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){let x=1/u;h*=x,f*=x,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Zh).addScaledVector(ua,f),p}intersectSphere(e,t){cn.subVectors(e.center,this.origin);let n=cn.dot(this.direction),s=cn.dot(cn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,cn)!==null}intersectTriangle(e,t,n,s,r){Kh.subVectors(t,e),ha.subVectors(n,e),Jh.crossVectors(Kh,ha);let o=this.direction.dot(Jh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);let l=a*this.direction.dot(ha.crossVectors(Nn,ha));if(l<0)return null;let c=a*this.direction.dot(Kh.cross(Nn));if(c<0||l+c>o)return null;let u=-a*Nn.dot(Jh);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class i{constructor(e,t,n,s,r,o,a,l,c,u,h,f,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,h,f,p,g,x,m)}set(e,t,n,s,r,o,a,l,c,u,h,f,p,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/js.setFromMatrixColumn(e,0).length(),r=1/js.setFromMatrixColumn(e,1).length(),o=1/js.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,p=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*u,p=l*h,g=c*u,x=c*h;t[0]=f+x*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*u,p=l*h,g=c*u,x=c*h;t[0]=f-x*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*u,p=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=g*c-p,t[8]=f*c+x,t[1]=l*h,t[5]=x*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,p=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*h+g,t[10]=f-x*h}else if(e.order==="XZY"){let f=o*l,p=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+x,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kb,e,Vb)}lookAt(e,t,n){let s=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Fn.crossVectors(n,ci),Fn.lengthSq()===0&&(Math.abs(n.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Fn.crossVectors(n,ci)),Fn.normalize(),fa.crossVectors(ci,Fn),s[0]=Fn.x,s[4]=fa.x,s[8]=ci.x,s[1]=Fn.y,s[5]=fa.y,s[9]=ci.y,s[2]=Fn.z,s[6]=fa.z,s[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],v=n[3],M=n[7],y=n[11],A=n[15],T=s[0],R=s[4],C=s[8],S=s[12],_=s[1],P=s[5],H=s[9],k=s[13],X=s[2],J=s[6],W=s[10],j=s[14],V=s[3],re=s[7],fe=s[11],_e=s[15];return r[0]=o*T+a*_+l*X+c*V,r[4]=o*R+a*P+l*J+c*re,r[8]=o*C+a*H+l*W+c*fe,r[12]=o*S+a*k+l*j+c*_e,r[1]=u*T+h*_+f*X+p*V,r[5]=u*R+h*P+f*J+p*re,r[9]=u*C+h*H+f*W+p*fe,r[13]=u*S+h*k+f*j+p*_e,r[2]=g*T+x*_+m*X+d*V,r[6]=g*R+x*P+m*J+d*re,r[10]=g*C+x*H+m*W+d*fe,r[14]=g*S+x*k+m*j+d*_e,r[3]=v*T+M*_+y*X+A*V,r[7]=v*R+M*P+y*J+A*re,r[11]=v*C+M*H+y*W+A*fe,r[15]=v*S+M*k+y*j+A*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+r*l*h-s*c*h-r*a*f+n*c*f+s*a*p-n*l*p)+x*(+t*l*p-t*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+t*c*h-t*a*p-r*o*h+n*o*p+r*a*u-n*c*u)+d*(-s*a*u-t*l*h+t*a*f+s*o*h-n*o*f+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],d=e[15],v=h*m*c-x*f*c+x*l*p-a*m*p-h*l*d+a*f*d,M=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,y=u*x*c-g*h*c+g*a*p-o*x*p-u*a*d+o*h*d,A=g*h*l-u*x*l-g*a*f+o*x*f+u*a*m-o*h*m,T=t*v+n*M+s*y+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return e[0]=v*R,e[1]=(x*f*r-h*m*r-x*s*p+n*m*p+h*s*d-n*f*d)*R,e[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*d+n*l*d)*R,e[3]=(h*l*r-a*f*r-h*s*c+n*f*c+a*s*p-n*l*p)*R,e[4]=M*R,e[5]=(u*m*r-g*f*r+g*s*p-t*m*p-u*s*d+t*f*d)*R,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*d-t*l*d)*R,e[7]=(o*f*r-u*l*r+u*s*c-t*f*c-o*s*p+t*l*p)*R,e[8]=y*R,e[9]=(g*h*r-u*x*r-g*n*p+t*x*p+u*n*d-t*h*d)*R,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*d+t*a*d)*R,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*p-t*a*p)*R,e[12]=A*R,e[13]=(u*x*s-g*h*s+g*n*f-t*x*f-u*n*m+t*h*m)*R,e[14]=(g*a*s-o*x*s-g*n*l+t*x*l+o*n*m-t*a*m)*R,e[15]=(o*h*s-u*a*s+u*n*l-t*h*l-o*n*f+t*a*f)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,g=r*h,x=o*u,m=o*h,d=a*h,v=l*c,M=l*u,y=l*h,A=n.x,T=n.y,R=n.z;return s[0]=(1-(x+d))*A,s[1]=(p+y)*A,s[2]=(g-M)*A,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(f+d))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+M)*R,s[9]=(m-v)*R,s[10]=(1-(f+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=js.set(s[0],s[1],s[2]).length(),o=js.set(s[4],s[5],s[6]).length(),a=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Li.copy(this);let c=1/r,u=1/o,h=1/a;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=u,Li.elements[5]*=u,Li.elements[6]*=u,Li.elements[8]*=h,Li.elements[9]*=h,Li.elements[10]*=h,t.setFromRotationMatrix(Li),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=xn){let l=this.elements,c=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),p,g;if(a===xn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Va)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=xn){let l=this.elements,c=1/(t-e),u=1/(n-s),h=1/(o-r),f=(t+e)*c,p=(n+s)*u,g,x;if(a===xn)g=(o+r)*h,x=-2*h;else if(a===Va)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},js=new U,Li=new Et,kb=new U(0,0,0),Vb=new U(1,1,1),Fn=new U,fa=new U,ci=new U,Sm=new Et,wm=new qn,bn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wm.setFromEuler(this),this.setFromQuaternion(wm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Xa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Hb=0,Tm=new U,Qs=new qn,un=new Et,da=new U,_o=new U,Gb=new U,Wb=new qn,Em=new U(1,0,0),Am=new U(0,1,0),Cm=new U(0,0,1),Rm={type:"added"},Xb={type:"removed"},er={type:"childadded",child:null},jh={type:"childremoved",child:null},fi=class i extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hb++}),this.uuid=Mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new bn,n=new qn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Et},normalMatrix:{value:new Oe}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.multiply(Qs),this}rotateOnWorldAxis(e,t){return Qs.setFromAxisAngle(e,t),this.quaternion.premultiply(Qs),this}rotateX(e){return this.rotateOnAxis(Em,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,t){return Tm.copy(e).applyQuaternion(this.quaternion),this.position.add(Tm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Em,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?da.copy(e):da.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),_o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(_o,da,this.up):un.lookAt(da,_o,this.up),this.quaternion.setFromRotationMatrix(un),s&&(un.extractRotation(s.matrixWorld),Qs.setFromRotationMatrix(un),this.quaternion.premultiply(Qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rm),er.child=e,this.dispatchEvent(er),er.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xb),jh.child=e,this.dispatchEvent(jh),jh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rm),er.child=e,this.dispatchEvent(er),er.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,e,Gb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,Wb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};fi.DEFAULT_UP=new U(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Oi=new U,hn=new U,Qh=new U,fn=new U,tr=new U,ir=new U,Pm=new U,ef=new U,tf=new U,nf=new U,sf=new Tt,rf=new Tt,of=new Tt,Vn=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Oi.subVectors(e,t),s.cross(Oi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Oi.subVectors(s,t),hn.subVectors(n,t),Qh.subVectors(e,t);let o=Oi.dot(Oi),a=Oi.dot(hn),l=Oi.dot(Qh),c=hn.dot(hn),u=hn.dot(Qh),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fn.x),l.addScaledVector(o,fn.y),l.addScaledVector(a,fn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return sf.setScalar(0),rf.setScalar(0),of.setScalar(0),sf.fromBufferAttribute(e,t),rf.fromBufferAttribute(e,n),of.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(sf,r.x),o.addScaledVector(rf,r.y),o.addScaledVector(of,r.z),o}static isFrontFacing(e,t,n,s){return Oi.subVectors(n,t),hn.subVectors(e,t),Oi.cross(hn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Oi.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Oi.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;tr.subVectors(s,n),ir.subVectors(r,n),ef.subVectors(e,n);let l=tr.dot(ef),c=ir.dot(ef);if(l<=0&&c<=0)return t.copy(n);tf.subVectors(e,s);let u=tr.dot(tf),h=ir.dot(tf);if(u>=0&&h<=u)return t.copy(s);let f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(tr,o);nf.subVectors(e,r);let p=tr.dot(nf),g=ir.dot(nf);if(g>=0&&p<=g)return t.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ir,a);let m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Pm.subVectors(r,s),a=(h-u)/(h-u+(p-g)),t.copy(s).addScaledVector(Pm,a);let d=1/(m+x+f);return o=x*d,a=f*d,t.copy(n).addScaledVector(tr,o).addScaledVector(ir,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ag={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},pa={h:0,s:0,l:0};function af(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=Zd(e,1),t=$t(t,0,1),n=$t(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=af(o,r,e+1/3),this.g=af(o,r,e),this.b=af(o,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=vi){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vi){let n=Ag[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yn(e.r),this.g=yn(e.g),this.b=yn(e.b),this}copyLinearToSRGB(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vi){return qe.fromWorkingColorSpace(Ht.copy(this),e),Math.round($t(Ht.r*255,0,255))*65536+Math.round($t(Ht.g*255,0,255))*256+Math.round($t(Ht.b*255,0,255))}getHexString(e=vi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(Ht.copy(this),t);let n=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=vi){qe.fromWorkingColorSpace(Ht.copy(this),e);let t=Ht.r,n=Ht.g,s=Ht.b;return e!==vi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(pa);let n=To(Bn.h,pa.h,t),s=To(Bn.s,pa.s,t),r=To(Bn.l,pa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new Ye;Ye.NAMES=Ag;var qb=0,Yn=class extends Xn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qb++}),this.uuid=Mr(),this.name="",this.blending=cr,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_f,this.blendDst=bf,this.blendEquation=bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ys,this.stencilZFail=Ys,this.stencilZPass=Ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==cr&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_f&&(n.blendSrc=this.blendSrc),this.blendDst!==bf&&(n.blendDst=this.blendDst),this.blendEquation!==bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Po=class extends Yn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=dg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Rt=new U,ma=new je,hi=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dm,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ar(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),s=qt(s,this.array),r=qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dm&&(e.usage=this.usage),e}};var qa=class extends hi{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ya=class extends hi{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ft=class extends hi{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yb=0,yi=new Et,lf=new fi,nr=new U,ui=new As,bo=new As,Nt=new U,di=class i extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eg(e)?Ya:qa)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yi.makeRotationFromQuaternion(e),this.applyMatrix4(yi),this}rotateX(e){return yi.makeRotationX(e),this.applyMatrix4(yi),this}rotateY(e){return yi.makeRotationY(e),this.applyMatrix4(yi),this}rotateZ(e){return yi.makeRotationZ(e),this.applyMatrix4(yi),this}translate(e,t,n){return yi.makeTranslation(e,t,n),this.applyMatrix4(yi),this}scale(e,t,n){return yi.makeScale(e,t,n),this.applyMatrix4(yi),this}lookAt(e){return lf.lookAt(e),lf.updateMatrix(),this.applyMatrix4(lf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ft(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];ui.setFromBufferAttribute(r),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(ui.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];bo.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(ui.min,bo.min),ui.expandByPoint(Nt),Nt.addVectors(ui.max,bo.max),ui.expandByPoint(Nt)):(ui.expandByPoint(bo.min),ui.expandByPoint(bo.max))}ui.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Nt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Nt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Nt.fromBufferAttribute(a,c),l&&(nr.fromBufferAttribute(e,c),Nt.add(nr)),s=Math.max(s,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hi(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new U,l[C]=new U;let c=new U,u=new U,h=new U,f=new je,p=new je,g=new je,x=new U,m=new U;function d(C,S,_){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,_),u.sub(c),h.sub(c),p.sub(f),g.sub(f);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[C].add(x),a[S].add(x),a[_].add(x),l[C].add(m),l[S].add(m),l[_].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let C=0,S=v.length;C<S;++C){let _=v[C],P=_.start,H=_.count;for(let k=P,X=P+H;k<X;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let M=new U,y=new U,A=new U,T=new U;function R(C){A.fromBufferAttribute(s,C),T.copy(A);let S=a[C];M.copy(S),M.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(T,S);let P=y.dot(l[C])<0?-1:1;o.setXYZW(C,M.x,M.y,M.z,P)}for(let C=0,S=v.length;C<S;++C){let _=v[C],P=_.start,H=_.count;for(let k=P,X=P+H;k<X;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,u=new U,h=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u),p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new hi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let f=c[u],p=e(f,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){let p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Im=new Et,gs=new Ro,ga=new Cs,Dm=new U,xa=new U,ya=new U,va=new U,cf=new U,_a=new U,Lm=new U,ba=new U,_i=class extends fi{constructor(e=new di,t=new Po){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){_a.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(cf.fromBufferAttribute(h,e),o?_a.addScaledVector(cf,u):_a.addScaledVector(cf.sub(t),u))}t.add(_a)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(r),gs.copy(e.ray).recast(e.near),!(ga.containsPoint(gs.origin)===!1&&(gs.intersectSphere(ga,Dm)===null||gs.origin.distanceToSquared(Dm)>(e.far-e.near)**2))&&(Im.copy(r).invert(),gs.copy(e.ray).applyMatrix4(Im),!(n.boundingBox!==null&&gs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=o[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=M;y<A;y+=3){let T=a.getX(y),R=a.getX(y+1),C=a.getX(y+2);s=Ma(this,d,e,n,c,u,h,T,R,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let v=a.getX(m),M=a.getX(m+1),y=a.getX(m+2);s=Ma(this,o,e,n,c,u,h,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=o[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=M;y<A;y+=3){let T=y,R=y+1,C=y+2;s=Ma(this,d,e,n,c,u,h,T,R,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let v=m,M=m+1,y=m+2;s=Ma(this,o,e,n,c,u,h,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function $b(i,e,t,n,s,r,o,a){let l;if(e.side===Zt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Wn,a),l===null)return null;ba.copy(a),ba.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ba);return c<t.near||c>t.far?null:{distance:c,point:ba.clone(),object:i}}function Ma(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,xa),i.getVertexPosition(l,ya),i.getVertexPosition(c,va);let u=$b(i,e,t,n,xa,ya,va,Lm);if(u){let h=new U;Vn.getBarycoord(Lm,xa,ya,va,h),s&&(u.uv=Vn.getInterpolatedAttribute(s,a,l,c,h,new je)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,a,l,c,h,new je)),o&&(u.normal=Vn.getInterpolatedAttribute(o,a,l,c,h,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new U,materialIndex:0};Vn.getNormal(xa,ya,va,f.normal),u.face=f,u.barycoord=h}return u}var Io=class i extends di{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(h,2));function g(x,m,d,v,M,y,A,T,R,C,S){let _=y/R,P=A/C,H=y/2,k=A/2,X=T/2,J=R+1,W=C+1,j=0,V=0,re=new U;for(let fe=0;fe<W;fe++){let _e=fe*P-k;for(let Ne=0;Ne<J;Ne++){let Ze=Ne*_-H;re[x]=Ze*v,re[m]=_e*M,re[d]=X,c.push(re.x,re.y,re.z),re[x]=0,re[m]=0,re[d]=T>0?1:-1,u.push(re.x,re.y,re.z),h.push(Ne/R),h.push(1-fe/C),j+=1}}for(let fe=0;fe<C;fe++)for(let _e=0;_e<R;_e++){let Ne=f+_e+J*fe,Ze=f+_e+J*(fe+1),q=f+(_e+1)+J*(fe+1),Q=f+(_e+1)+J*fe;l.push(Ne,Ze,Q),l.push(Ze,q,Q),V+=6}a.addGroup(p,V,S),p+=V,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function vr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=vr(i[t]);for(let s in n)e[s]=n[s]}return e}function Zb(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cg(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var Kb={clone:vr,merge:Yt},Jb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fi=class extends Yn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jb,this.fragmentShader=jb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=Zb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},$a=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},zn=new U,Om=new je,Um=new je,ii=class extends $a{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Om,Um),t.subVectors(Um,Om)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(hr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},sr=-90,rr=1,cd=class extends fi{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ii(sr,rr,e,t);s.layers=this.layers,this.add(s);let r=new ii(sr,rr,e,t);r.layers=this.layers,this.add(r);let o=new ii(sr,rr,e,t);o.layers=this.layers,this.add(o);let a=new ii(sr,rr,e,t);a.layers=this.layers,this.add(a);let l=new ii(sr,rr,e,t);l.layers=this.layers,this.add(l);let c=new ii(sr,rr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Va)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Za=class extends bi{constructor(e,t,n,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:mr,super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ud=class extends _n{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Za(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:qi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Io(5,5,5),r=new Fi({name:"CubemapFromEquirect",uniforms:vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:Hn});r.uniforms.tEquirect.value=t;let o=new _i(s,r),a=t.minFilter;return t.minFilter===ws&&(t.minFilter=qi),new cd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},uf=new U,Qb=new U,eM=new Oe,pn=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=uf.subVectors(n,t).cross(Qb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(uf),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||eM.getNormalMatrix(e),s=this.coplanarPoint(uf).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},xs=new Cs,Sa=new U,Ka=class{constructor(e=new pn,t=new pn,n=new pn,s=new pn,r=new pn,o=new pn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xn){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],g=s[9],x=s[10],m=s[11],d=s[12],v=s[13],M=s[14],y=s[15];if(n[0].setComponents(l-r,f-c,m-p,y-d).normalize(),n[1].setComponents(l+r,f+c,m+p,y+d).normalize(),n[2].setComponents(l+o,f+u,m+g,y+v).normalize(),n[3].setComponents(l-o,f-u,m-g,y-v).normalize(),n[4].setComponents(l-a,f-h,m-x,y-M).normalize(),t===xn)n[5].setComponents(l+a,f+h,m+x,y+M).normalize();else if(t===Va)n[5].setComponents(a,h,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xs)}intersectsSprite(e){return xs.center.set(0,0,0),xs.radius=.7071067811865476,xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(xs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Sa.x=s.normal.x>0?e.max.x:e.min.x,Sa.y=s.normal.y>0?e.max.y:e.min.y,Sa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Sa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Rg(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function tM(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){let g=h[f],x=h[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){let x=h[p];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Ja=class i extends di{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,h=e/a,f=t/l,p=[],g=[],x=[],m=[];for(let d=0;d<u;d++){let v=d*f-o;for(let M=0;M<c;M++){let y=M*h-r;g.push(y,-v,0),x.push(0,0,1),m.push(M/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<a;v++){let M=v+c*d,y=v+c*(d+1),A=v+1+c*(d+1),T=v+1+c*d;p.push(M,y,T),p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(x,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},iM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_M=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,MM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,SM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,TM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,EM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,AM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,CM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,IM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DM="gl_FragColor = linearToOutputTexel( gl_FragColor );",LM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,OM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,UM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,NM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,FM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,VM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,HM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,WM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$M=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ZM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,QM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,iS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_S=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ES=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,IS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,LS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,US=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,FS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,BS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,VS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,XS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,YS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$S=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,QS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ew=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ow=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_w=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ww=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ew=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ow=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:iM,alphahash_pars_fragment:nM,alphamap_fragment:sM,alphamap_pars_fragment:rM,alphatest_fragment:oM,alphatest_pars_fragment:aM,aomap_fragment:lM,aomap_pars_fragment:cM,batching_pars_vertex:uM,batching_vertex:hM,begin_vertex:fM,beginnormal_vertex:dM,bsdfs:pM,iridescence_fragment:mM,bumpmap_pars_fragment:gM,clipping_planes_fragment:xM,clipping_planes_pars_fragment:yM,clipping_planes_pars_vertex:vM,clipping_planes_vertex:_M,color_fragment:bM,color_pars_fragment:MM,color_pars_vertex:SM,color_vertex:wM,common:TM,cube_uv_reflection_fragment:EM,defaultnormal_vertex:AM,displacementmap_pars_vertex:CM,displacementmap_vertex:RM,emissivemap_fragment:PM,emissivemap_pars_fragment:IM,colorspace_fragment:DM,colorspace_pars_fragment:LM,envmap_fragment:OM,envmap_common_pars_fragment:UM,envmap_pars_fragment:NM,envmap_pars_vertex:FM,envmap_physical_pars_fragment:$M,envmap_vertex:BM,fog_vertex:zM,fog_pars_vertex:kM,fog_fragment:VM,fog_pars_fragment:HM,gradientmap_pars_fragment:GM,lightmap_pars_fragment:WM,lights_lambert_fragment:XM,lights_lambert_pars_fragment:qM,lights_pars_begin:YM,lights_toon_fragment:ZM,lights_toon_pars_fragment:KM,lights_phong_fragment:JM,lights_phong_pars_fragment:jM,lights_physical_fragment:QM,lights_physical_pars_fragment:eS,lights_fragment_begin:tS,lights_fragment_maps:iS,lights_fragment_end:nS,logdepthbuf_fragment:sS,logdepthbuf_pars_fragment:rS,logdepthbuf_pars_vertex:oS,logdepthbuf_vertex:aS,map_fragment:lS,map_pars_fragment:cS,map_particle_fragment:uS,map_particle_pars_fragment:hS,metalnessmap_fragment:fS,metalnessmap_pars_fragment:dS,morphinstance_vertex:pS,morphcolor_vertex:mS,morphnormal_vertex:gS,morphtarget_pars_vertex:xS,morphtarget_vertex:yS,normal_fragment_begin:vS,normal_fragment_maps:_S,normal_pars_fragment:bS,normal_pars_vertex:MS,normal_vertex:SS,normalmap_pars_fragment:wS,clearcoat_normal_fragment_begin:TS,clearcoat_normal_fragment_maps:ES,clearcoat_pars_fragment:AS,iridescence_pars_fragment:CS,opaque_fragment:RS,packing:PS,premultiplied_alpha_fragment:IS,project_vertex:DS,dithering_fragment:LS,dithering_pars_fragment:OS,roughnessmap_fragment:US,roughnessmap_pars_fragment:NS,shadowmap_pars_fragment:FS,shadowmap_pars_vertex:BS,shadowmap_vertex:zS,shadowmask_pars_fragment:kS,skinbase_vertex:VS,skinning_pars_vertex:HS,skinning_vertex:GS,skinnormal_vertex:WS,specularmap_fragment:XS,specularmap_pars_fragment:qS,tonemapping_fragment:YS,tonemapping_pars_fragment:$S,transmission_fragment:ZS,transmission_pars_fragment:KS,uv_pars_fragment:JS,uv_pars_vertex:jS,uv_vertex:QS,worldpos_vertex:ew,background_vert:tw,background_frag:iw,backgroundCube_vert:nw,backgroundCube_frag:sw,cube_vert:rw,cube_frag:ow,depth_vert:aw,depth_frag:lw,distanceRGBA_vert:cw,distanceRGBA_frag:uw,equirect_vert:hw,equirect_frag:fw,linedashed_vert:dw,linedashed_frag:pw,meshbasic_vert:mw,meshbasic_frag:gw,meshlambert_vert:xw,meshlambert_frag:yw,meshmatcap_vert:vw,meshmatcap_frag:_w,meshnormal_vert:bw,meshnormal_frag:Mw,meshphong_vert:Sw,meshphong_frag:ww,meshphysical_vert:Tw,meshphysical_frag:Ew,meshtoon_vert:Aw,meshtoon_frag:Cw,points_vert:Rw,points_frag:Pw,shadow_vert:Iw,shadow_frag:Dw,sprite_vert:Lw,sprite_frag:Ow},se={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Xi={basic:{uniforms:Yt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Yt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Yt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Yt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Yt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Yt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Yt([se.points,se.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Yt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Yt([se.common,se.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Yt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Yt([se.sprite,se.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Yt([se.common,se.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Yt([se.lights,se.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Xi.physical={uniforms:Yt([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var wa={r:0,b:0,g:0},ys=new bn,Uw=new Et;function Nw(i,e,t,n,s,r,o){let a=new Ye(0),l=r===!0?0:1,c,u,h=null,f=0,p=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?t:e).get(M)),M}function x(v){let M=!1,y=g(v);y===null?d(a,l):y&&y.isColor&&(d(y,1),M=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){let y=g(M);y&&(y.isCubeTexture||y.mapping===ol)?(u===void 0&&(u=new _i(new Io(1,1,1),new Fi({name:"BackgroundCubeMaterial",uniforms:vr(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ys.copy(M.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Uw.makeRotationFromEuler(ys)),u.material.toneMapped=qe.getTransfer(y.colorSpace)!==tt,(h!==y||f!==y.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new _i(new Ja(2,2),new Fi({name:"BackgroundMaterial",uniforms:vr(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qe.getTransfer(y.colorSpace)!==tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function d(v,M){v.getRGB(wa,Cg(i)),n.buffers.color.setClear(wa.r,wa.g,wa.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),l=M,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,d(a,l)},render:x,addToRenderList:m}}function Fw(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(_,P,H,k,X){let J=!1,W=h(k,H,P);r!==W&&(r=W,c(r.object)),J=p(_,k,H,X),J&&g(_,k,H,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(_,P,H,k),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function h(_,P,H){let k=H.wireframe===!0,X=n[_.id];X===void 0&&(X={},n[_.id]=X);let J=X[P.id];J===void 0&&(J={},X[P.id]=J);let W=J[k];return W===void 0&&(W=f(l()),J[k]=W),W}function f(_){let P=[],H=[],k=[];for(let X=0;X<t;X++)P[X]=0,H[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:k,object:_,attributes:{},index:null}}function p(_,P,H,k){let X=r.attributes,J=P.attributes,W=0,j=H.getAttributes();for(let V in j)if(j[V].location>=0){let fe=X[V],_e=J[V];if(_e===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(_e=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(_e=_.instanceColor)),fe===void 0||fe.attribute!==_e||_e&&fe.data!==_e.data)return!0;W++}return r.attributesNum!==W||r.index!==k}function g(_,P,H,k){let X={},J=P.attributes,W=0,j=H.getAttributes();for(let V in j)if(j[V].location>=0){let fe=J[V];fe===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(fe=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(fe=_.instanceColor));let _e={};_e.attribute=fe,fe&&fe.data&&(_e.data=fe.data),X[V]=_e,W++}r.attributes=X,r.attributesNum=W,r.index=k}function x(){let _=r.newAttributes;for(let P=0,H=_.length;P<H;P++)_[P]=0}function m(_){d(_,0)}function d(_,P){let H=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;H[_]=1,k[_]===0&&(i.enableVertexAttribArray(_),k[_]=1),X[_]!==P&&(i.vertexAttribDivisor(_,P),X[_]=P)}function v(){let _=r.newAttributes,P=r.enabledAttributes;for(let H=0,k=P.length;H<k;H++)P[H]!==_[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function M(_,P,H,k,X,J,W){W===!0?i.vertexAttribIPointer(_,P,H,X,J):i.vertexAttribPointer(_,P,H,k,X,J)}function y(_,P,H,k){x();let X=k.attributes,J=H.getAttributes(),W=P.defaultAttributeValues;for(let j in J){let V=J[j];if(V.location>=0){let re=X[j];if(re===void 0&&(j==="instanceMatrix"&&_.instanceMatrix&&(re=_.instanceMatrix),j==="instanceColor"&&_.instanceColor&&(re=_.instanceColor)),re!==void 0){let fe=re.normalized,_e=re.itemSize,Ne=e.get(re);if(Ne===void 0)continue;let Ze=Ne.buffer,q=Ne.type,Q=Ne.bytesPerElement,ge=q===i.INT||q===i.UNSIGNED_INT||re.gpuType===Gd;if(re.isInterleavedBufferAttribute){let ne=re.data,we=ne.stride,Ce=re.offset;if(ne.isInstancedInterleavedBuffer){for(let ze=0;ze<V.locationSize;ze++)d(V.location+ze,ne.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ze=0;ze<V.locationSize;ze++)m(V.location+ze);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let ze=0;ze<V.locationSize;ze++)M(V.location+ze,_e/V.locationSize,q,fe,we*Q,(Ce+_e/V.locationSize*ze)*Q,ge)}else{if(re.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)d(V.location+ne,re.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ne=0;ne<V.locationSize;ne++)m(V.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let ne=0;ne<V.locationSize;ne++)M(V.location+ne,_e/V.locationSize,q,fe,_e*Q,_e/V.locationSize*ne*Q,ge)}}else if(W!==void 0){let fe=W[j];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(V.location,fe);break;case 3:i.vertexAttrib3fv(V.location,fe);break;case 4:i.vertexAttrib4fv(V.location,fe);break;default:i.vertexAttrib1fv(V.location,fe)}}}}v()}function A(){C();for(let _ in n){let P=n[_];for(let H in P){let k=P[H];for(let X in k)u(k[X].object),delete k[X];delete P[H]}delete n[_]}}function T(_){if(n[_.id]===void 0)return;let P=n[_.id];for(let H in P){let k=P[H];for(let X in k)u(k[X].object),delete k[X];delete P[H]}delete n[_.id]}function R(_){for(let P in n){let H=n[P];if(H[_.id]===void 0)continue;let k=H[_.id];for(let X in k)u(k[X].object),delete k[X];delete H[_.id]}}function C(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function Bw(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function l(c,u,h,f){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function zw(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Ui&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let C=R===Do&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==vn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==gn&&!C)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:A,maxSamples:T}}function kw(i){let e=this,t=null,n=0,s=!1,r=!1,o=new pn,a=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let p=h.length!==0||f||n!==0||s;return s=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){let g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{let v=r?0:n,M=v*4,y=d.clippingState||null;l.value=y,y=u(g,f,M,p);for(let A=0;A!==M;++A)y[A]=t[A];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,p,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let d=p+x*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,y=p;M!==x;++M,y+=4)o.copy(h[M]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Vw(i){let e=new WeakMap;function t(o,a){return a===Rf?o.mapping=mr:a===Pf&&(o.mapping=gr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Rf||a===Pf)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new ud(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var hd=class extends $a{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},lr=4,Nm=[.125,.215,.35,.446,.526,.582],Ms=20,hf=new hd,Fm=new Ye,ff=null,df=0,pf=0,mf=!1,_s=(1+Math.sqrt(5))/2,or=1/_s,Bm=[new U(-_s,or,0),new U(_s,or,0),new U(-or,0,_s),new U(or,0,_s),new U(0,_s,-or),new U(0,_s,or),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],ja=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ff=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),pf=this._renderer.getActiveMipmapLevel(),mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=km(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ff,df,pf),this._renderer.xr.enabled=mf,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ff=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),pf=this._renderer.getActiveMipmapLevel(),mf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qi,minFilter:qi,generateMipmaps:!1,type:Do,format:Ui,colorSpace:br,depthBuffer:!1},s=zm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zm(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hw(r)),this._blurMaterial=Gw(r,e,t)}return s}_compileMaterial(e){let t=new _i(this._lodPlanes[0],e);this._renderer.compile(t,hf)}_sceneToCubeUV(e,t,n,s){let a=new ii(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Fm),u.toneMapping=Gn,u.autoClear=!1;let p=new Po({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),g=new _i(new Io,p),x=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Fm),x=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):v===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));let M=this._cubeSize;Ta(s,v*M,d>2?M:0,M,M),u.setRenderTarget(s),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===mr||e.mapping===gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=km());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new _i(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Ta(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,hf)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bm[(s-r-1)%Bm.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new _i(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ms-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Ms;m>Ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);let d=[],v=0;for(let R=0;R<Ms;++R){let C=R/x,S=Math.exp(-C*C/2);d.push(S),R===0?v+=S:R<m&&(v+=2*S)}for(let R=0;R<d.length;R++)d[R]=d[R]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;let y=this._sizeLods[s],A=3*y*(s>M-lr?s-M+lr:0),T=4*(this._cubeSize-y);Ta(t,A,T,3*y,2*y),l.setRenderTarget(t),l.render(h,hf)}};function Hw(i){let e=[],t=[],n=[],s=i,r=i-lr+1+Nm.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>i-lr?l=Nm[o-i+lr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,x=3,m=2,d=1,v=new Float32Array(x*g*p),M=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let T=0;T<p;T++){let R=T%3*2/3-1,C=T>2?0:-1,S=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];v.set(S,x*g*T),M.set(f,m*g*T);let _=[T,T,T,T,T,T];y.set(_,d*g*T)}let A=new di;A.setAttribute("position",new hi(v,x)),A.setAttribute("uv",new hi(M,m)),A.setAttribute("faceIndex",new hi(y,d)),e.push(A),s>lr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function zm(i,e,t){let n=new _n(i,e,t);return n.texture.mapping=ol,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ta(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Gw(i,e,t){let n=new Float32Array(Ms),s=new U(0,1,0);return new Fi({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function km(){return new Fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Vm(){return new Fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Kd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ww(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Rf||l===Pf,u=l===mr||l===gr;if(c||u){let h=e.get(a),f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new ja(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new ja(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Xw(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&So("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function qw(i,e,t,n){let s={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){let f=h.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let p=h.morphAttributes;for(let g in p){let x=p[g];for(let m=0,d=x.length;m<d;m++)e.update(x[m],i.ARRAY_BUFFER)}}function c(h){let f=[],p=h.index,g=h.attributes.position,x=0;if(p!==null){let v=p.array;x=p.version;for(let M=0,y=v.length;M<y;M+=3){let A=v[M+0],T=v[M+1],R=v[M+2];f.push(A,T,T,R,R,A)}}else if(g!==void 0){let v=g.array;x=g.version;for(let M=0,y=v.length/3-1;M<y;M+=3){let A=M+0,T=M+1,R=M+2;f.push(A,T,T,R,R,A)}}else return;let m=new(Eg(f)?Ya:qa)(f,1);m.version=x;let d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){let f=r.get(h);if(f){let p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Yw(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function h(f,p,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let d=0;for(let v=0;v<g;v++)d+=p[v]*x[v];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function $w(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Zw(i,e,t){let n=new WeakMap,s=new Tt;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(a);if(f===void 0||f.count!==h){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],M=0;p===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let y=a.attributes.position.count*M,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*A*4*h),R=new Wa(T,y,A,h);R.type=gn,R.needsUpdate=!0;let C=M*4;for(let _=0;_<h;_++){let P=m[_],H=d[_],k=v[_],X=y*A*4*_;for(let J=0;J<P.count;J++){let W=J*C;p===!0&&(s.fromBufferAttribute(P,J),T[X+W+0]=s.x,T[X+W+1]=s.y,T[X+W+2]=s.z,T[X+W+3]=0),g===!0&&(s.fromBufferAttribute(H,J),T[X+W+4]=s.x,T[X+W+5]=s.y,T[X+W+6]=s.z,T[X+W+7]=0),x===!0&&(s.fromBufferAttribute(k,J),T[X+W+8]=s.x,T[X+W+9]=s.y,T[X+W+10]=s.z,T[X+W+11]=k.itemSize===4?s.w:1)}}f={count:h,texture:R,size:new je(y,A)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Kw(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Qa=class extends bi{constructor(e,t,n,s,r,o,a,l,c,u=ur){if(u!==ur&&u!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ur&&(n=Es),n===void 0&&u===yr&&(n=xr),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ni,this.minFilter=l!==void 0?l:Ni,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Pg=new bi,Hm=new Qa(1,1),Ig=new Wa,Dg=new ld,Lg=new Za,Gm=[],Wm=[],Xm=new Float32Array(16),qm=new Float32Array(9),Ym=new Float32Array(4);function Sr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Gm[s];if(r===void 0&&(r=new Float32Array(s),Gm[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ll(i,e){let t=Wm[e];t===void 0&&(t=new Int32Array(e),Wm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Jw(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function Qw(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function eT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function tT(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Lt(t,n))return;Ym.set(n),i.uniformMatrix2fv(this.addr,!1,Ym),Ot(t,n)}}function iT(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Lt(t,n))return;qm.set(n),i.uniformMatrix3fv(this.addr,!1,qm),Ot(t,n)}}function nT(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Lt(t,n))return;Xm.set(n),i.uniformMatrix4fv(this.addr,!1,Xm),Ot(t,n)}}function sT(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function rT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function oT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function aT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function lT(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function uT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function hT(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function fT(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hm.compareFunction=Tg,r=Hm):r=Pg,t.setTexture2D(e||r,s)}function dT(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Dg,s)}function pT(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Lg,s)}function mT(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ig,s)}function gT(i){switch(i){case 5126:return Jw;case 35664:return jw;case 35665:return Qw;case 35666:return eT;case 35674:return tT;case 35675:return iT;case 35676:return nT;case 5124:case 35670:return sT;case 35667:case 35671:return rT;case 35668:case 35672:return oT;case 35669:case 35673:return aT;case 5125:return lT;case 36294:return cT;case 36295:return uT;case 36296:return hT;case 35678:case 36198:case 36298:case 36306:case 35682:return fT;case 35679:case 36299:case 36307:return dT;case 35680:case 36300:case 36308:case 36293:return pT;case 36289:case 36303:case 36311:case 36292:return mT}}function xT(i,e){i.uniform1fv(this.addr,e)}function yT(i,e){let t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function vT(i,e){let t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function _T(i,e){let t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function bT(i,e){let t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function MT(i,e){let t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ST(i,e){let t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function wT(i,e){i.uniform1iv(this.addr,e)}function TT(i,e){i.uniform2iv(this.addr,e)}function ET(i,e){i.uniform3iv(this.addr,e)}function AT(i,e){i.uniform4iv(this.addr,e)}function CT(i,e){i.uniform1uiv(this.addr,e)}function RT(i,e){i.uniform2uiv(this.addr,e)}function PT(i,e){i.uniform3uiv(this.addr,e)}function IT(i,e){i.uniform4uiv(this.addr,e)}function DT(i,e,t){let n=this.cache,s=e.length,r=ll(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Pg,r[o])}function LT(i,e,t){let n=this.cache,s=e.length,r=ll(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Dg,r[o])}function OT(i,e,t){let n=this.cache,s=e.length,r=ll(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Lg,r[o])}function UT(i,e,t){let n=this.cache,s=e.length,r=ll(t,s);Lt(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ig,r[o])}function NT(i){switch(i){case 5126:return xT;case 35664:return yT;case 35665:return vT;case 35666:return _T;case 35674:return bT;case 35675:return MT;case 35676:return ST;case 5124:case 35670:return wT;case 35667:case 35671:return TT;case 35668:case 35672:return ET;case 35669:case 35673:return AT;case 5125:return CT;case 36294:return RT;case 36295:return PT;case 36296:return IT;case 35678:case 36198:case 36298:case 36306:case 35682:return DT;case 35679:case 36299:case 36307:return LT;case 35680:case 36300:case 36308:case 36293:return OT;case 36289:case 36303:case 36311:case 36292:return UT}}var fd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gT(t.type)}},dd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=NT(t.type)}},pd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},gf=/(\w+)(\])?(\[|\.)?/g;function $m(i,e){i.seq.push(e),i.map[e.id]=e}function FT(i,e,t){let n=i.name,s=n.length;for(gf.lastIndex=0;;){let r=gf.exec(n),o=gf.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){$m(t,c===void 0?new fd(a,i,e):new dd(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new pd(a),$m(t,h)),t=h}}}var dr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);FT(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Zm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var BT=37297,zT=0;function kT(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Km=new Oe;function VT(i){qe._getMatrix(Km,qe.workingColorSpace,i);let e=`mat3( ${Km.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case al:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Jm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+kT(i.getShaderSource(e),o)}else return s}function HT(i,e){let t=VT(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function GT(i,e){let t;switch(e){case J0:t="Linear";break;case j0:t="Reinhard";break;case Q0:t="Cineon";break;case eb:t="ACESFilmic";break;case ib:t="AgX";break;case nb:t="Neutral";break;case tb:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ea=new U;function WT(){qe.getLuminanceCoefficients(Ea);let i=Ea.x.toFixed(4),e=Ea.y.toFixed(4),t=Ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function qT(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function YT(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function wo(i){return i!==""}function jm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var $T=/^[ \t]*#include +<([\w\d./]+)>/gm;function md(i){return i.replace($T,KT)}var ZT=new Map;function KT(i,e){let t=Be[e];if(t===void 0){let n=ZT.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return md(t)}var JT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eg(i){return i.replace(JT,jT)}function jT(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tg(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function QT(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===fg?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===P0?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(e="SHADOWMAP_TYPE_VSM"),e}function eE(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case mr:case gr:e="ENVMAP_TYPE_CUBE";break;case ol:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tE(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===gr&&(e="ENVMAP_MODE_REFRACTION"),e}function iE(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case dg:e="ENVMAP_BLENDING_MULTIPLY";break;case Z0:e="ENVMAP_BLENDING_MIX";break;case K0:e="ENVMAP_BLENDING_ADD";break}return e}function nE(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function sE(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=QT(t),c=eE(t),u=tE(t),h=iE(t),f=nE(t),p=XT(t),g=qT(r),x=s.createProgram(),m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wo).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wo).join(`
`),d.length>0&&(d+=`
`)):(m=[tg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),d=[tg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Gn?GT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,HT("linearToOutputTexel",t.outputColorSpace),WT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wo).join(`
`)),o=md(o),o=jm(o,t),o=Qm(o,t),a=md(a),a=jm(a,t),a=Qm(a,t),o=eg(o),a=eg(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===pm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let M=v+m+o,y=v+d+a,A=Zm(s,s.VERTEX_SHADER,M),T=Zm(s,s.FRAGMENT_SHADER,y);s.attachShader(x,A),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(P){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(x).trim(),k=s.getShaderInfoLog(A).trim(),X=s.getShaderInfoLog(T).trim(),J=!0,W=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,T);else{let j=Jm(s,A,"vertex"),V=Jm(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+j+`
`+V)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(k===""||X==="")&&(W=!1);W&&(P.diagnostics={runnable:J,programLog:H,vertexShader:{log:k,prefix:m},fragmentShader:{log:X,prefix:d}})}s.deleteShader(A),s.deleteShader(T),C=new dr(s,x),S=YT(s,x)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,BT)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zT++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=T,this}var rE=0,gd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new xd(e),t.set(e,n)),n}},xd=class{constructor(e){this.id=rE++,this.code=e,this.usedTimes=0}};function oE(i,e,t,n,s,r,o){let a=new Xa,l=new gd,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,_,P,H,k){let X=H.fog,J=k.geometry,W=S.isMeshStandardMaterial?H.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),V=j&&j.mapping===ol?j.image.height:null,re=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));let fe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,_e=fe!==void 0?fe.length:0,Ne=0;J.morphAttributes.position!==void 0&&(Ne=1),J.morphAttributes.normal!==void 0&&(Ne=2),J.morphAttributes.color!==void 0&&(Ne=3);let Ze,q,Q,ge;if(re){let et=Xi[re];Ze=et.vertexShader,q=et.fragmentShader}else Ze=S.vertexShader,q=S.fragmentShader,l.update(S),Q=l.getVertexShaderID(S),ge=l.getFragmentShaderID(S);let ne=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ce=k.isInstancedMesh===!0,ze=k.isBatchedMesh===!0,gt=!!S.map,We=!!S.matcap,wt=!!j,O=!!S.aoMap,gi=!!S.lightMap,Ve=!!S.bumpMap,He=!!S.normalMap,Ee=!!S.displacementMap,at=!!S.emissiveMap,Te=!!S.metalnessMap,E=!!S.roughnessMap,b=S.anisotropy>0,F=S.clearcoat>0,$=S.dispersion>0,K=S.iridescence>0,Y=S.sheen>0,be=S.transmission>0,le=b&&!!S.anisotropyMap,de=F&&!!S.clearcoatMap,Xe=F&&!!S.clearcoatNormalMap,ee=F&&!!S.clearcoatRoughnessMap,pe=K&&!!S.iridescenceMap,Re=K&&!!S.iridescenceThicknessMap,Pe=Y&&!!S.sheenColorMap,me=Y&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Fe=!!S.specularColorMap,st=!!S.specularIntensityMap,I=be&&!!S.transmissionMap,oe=be&&!!S.thicknessMap,G=!!S.gradientMap,Z=!!S.alphaMap,he=S.alphaTest>0,ce=!!S.alphaHash,De=!!S.extensions,_t=Gn;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(_t=i.toneMapping);let kt={shaderID:re,shaderType:S.type,shaderName:S.name,vertexShader:Ze,fragmentShader:q,defines:S.defines,customVertexShaderID:Q,customFragmentShaderID:ge,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:ze,batchingColor:ze&&k._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&k.instanceColor!==null,instancingMorph:Ce&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:br,alphaToCoverage:!!S.alphaToCoverage,map:gt,matcap:We,envMap:wt,envMapMode:wt&&j.mapping,envMapCubeUVHeight:V,aoMap:O,lightMap:gi,bumpMap:Ve,normalMap:He,displacementMap:f&&Ee,emissiveMap:at,normalMapObjectSpace:He&&S.normalMapType===lb,normalMapTangentSpace:He&&S.normalMapType===ab,metalnessMap:Te,roughnessMap:E,anisotropy:b,anisotropyMap:le,clearcoat:F,clearcoatMap:de,clearcoatNormalMap:Xe,clearcoatRoughnessMap:ee,dispersion:$,iridescence:K,iridescenceMap:pe,iridescenceThicknessMap:Re,sheen:Y,sheenColorMap:Pe,sheenRoughnessMap:me,specularMap:Ge,specularColorMap:Fe,specularIntensityMap:st,transmission:be,transmissionMap:I,thicknessMap:oe,gradientMap:G,opaque:S.transparent===!1&&S.blending===cr&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:he,alphaHash:ce,combine:S.combine,mapUv:gt&&x(S.map.channel),aoMapUv:O&&x(S.aoMap.channel),lightMapUv:gi&&x(S.lightMap.channel),bumpMapUv:Ve&&x(S.bumpMap.channel),normalMapUv:He&&x(S.normalMap.channel),displacementMapUv:Ee&&x(S.displacementMap.channel),emissiveMapUv:at&&x(S.emissiveMap.channel),metalnessMapUv:Te&&x(S.metalnessMap.channel),roughnessMapUv:E&&x(S.roughnessMap.channel),anisotropyMapUv:le&&x(S.anisotropyMap.channel),clearcoatMapUv:de&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&x(S.sheenRoughnessMap.channel),specularMapUv:Ge&&x(S.specularMap.channel),specularColorMapUv:Fe&&x(S.specularColorMap.channel),specularIntensityMapUv:st&&x(S.specularIntensityMap.channel),transmissionMapUv:I&&x(S.transmissionMap.channel),thicknessMapUv:oe&&x(S.thicknessMap.channel),alphaMapUv:Z&&x(S.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(He||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!J.attributes.uv&&(gt||Z),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:we,skinning:k.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ne,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:gt&&S.map.isVideoTexture===!0&&qe.getTransfer(S.map.colorSpace)===tt,decodeVideoTextureEmissive:at&&S.emissiveMap.isVideoTexture===!0&&qe.getTransfer(S.emissiveMap.colorSpace)===tt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mn,flipSided:S.side===Zt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:De&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&S.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function d(S){let _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)_.push(P),_.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(v(_,S),M(_,S),_.push(i.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function v(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function M(S,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let _=g[S.type],P;if(_){let H=Xi[_];P=Kb.clone(H.uniforms)}else P=S.uniforms;return P}function A(S,_){let P;for(let H=0,k=u.length;H<k;H++){let X=u[H];if(X.cacheKey===_){P=X,++P.usedTimes;break}}return P===void 0&&(P=new sE(i,_,S,r),u.push(P)),P}function T(S){if(--S.usedTimes===0){let _=u.indexOf(S);u[_]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:A,releaseProgram:T,releaseShaderCache:R,programs:u,dispose:C}}function aE(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function lE(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ig(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ng(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,p,g,x,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function a(h,f,p,g,x,m){let d=o(h,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function l(h,f,p,g,x,m){let d=o(h,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||lE),n.length>1&&n.sort(f||ig),s.length>1&&s.sort(f||ig)}function u(){for(let h=e,f=i.length;h<f;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function cE(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new ng,i.set(n,[o])):s>=r.length?(o=new ng,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function uE(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ye};break;case"SpotLight":t={position:new U,direction:new U,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function hE(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var fE=0;function dE(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function pE(i){let e=new uE,t=hE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new Et,o=new Et;function a(c){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,v=0,M=0,y=0,A=0,T=0,R=0;c.sort(dE);for(let S=0,_=c.length;S<_;S++){let P=c[S],H=P.color,k=P.intensity,X=P.distance,J=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=H.r*k,h+=H.g*k,f+=H.b*k;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],k);R++}else if(P.isDirectionalLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let j=P.shadow,V=t.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=J,n.directionalShadowMatrix[p]=P.shadow.matrix,v++}n.directional[p]=W,p++}else if(P.isSpotLight){let W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(H).multiplyScalar(k),W.distance=X,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[x]=W;let j=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,j.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[x]=j.matrix,P.castShadow){let V=t.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=J,y++}x++}else if(P.isRectAreaLight){let W=e.get(P);W.color.copy(H).multiplyScalar(k),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let j=P.shadow,V=t.get(P);V.shadowIntensity=j.intensity,V.shadowBias=j.bias,V.shadowNormalBias=j.normalBias,V.shadowRadius=j.radius,V.shadowMapSize=j.mapSize,V.shadowCameraNear=j.camera.near,V.shadowCameraFar=j.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=W,g++}else if(P.isHemisphereLight){let W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(k),W.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[d]=W,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==d||C.numDirectionalShadows!==v||C.numPointShadows!==M||C.numSpotShadows!==y||C.numSpotMaps!==A||C.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,C.directionalLength=p,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=d,C.numDirectionalShadows=v,C.numPointShadows=M,C.numSpotShadows=y,C.numSpotMaps=A,C.numLightProbes=R,n.version=fE++)}function l(c,u){let h=0,f=0,p=0,g=0,x=0,m=u.matrixWorldInverse;for(let d=0,v=c.length;d<v;d++){let M=c[d];if(M.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(M.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function sg(i){let e=new pE(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function mE(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new sg(i),e.set(s,[a])):r>=o.length?(a=new sg(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var yd=class extends Yn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=rb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},vd=class extends Yn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},gE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yE(i,e,t){let n=new Ka,s=new je,r=new je,o=new Tt,a=new yd({depthPacking:ob}),l=new vd,c={},u=t.maxTextureSize,h={[Wn]:Zt,[Zt]:Wn,[mn]:mn},f=new Fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:gE,fragmentShader:xE}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new di;g.setAttribute("position",new hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new _i(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fg;let d=this.type;this.render=function(T,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),_=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Hn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let k=d!==dn&&this.type===dn,X=d===dn&&this.type!==dn;for(let J=0,W=T.length;J<W;J++){let j=T[J],V=j.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let re=V.getFrameExtents();if(s.multiply(re),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/re.x),s.x=r.x*re.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/re.y),s.y=r.y*re.y,V.mapSize.y=r.y)),V.map===null||k===!0||X===!0){let _e=this.type!==dn?{minFilter:Ni,magFilter:Ni}:{};V.map!==null&&V.map.dispose(),V.map=new _n(s.x,s.y,_e),V.map.texture.name=j.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let fe=V.getViewportCount();for(let _e=0;_e<fe;_e++){let Ne=V.getViewport(_e);o.set(r.x*Ne.x,r.y*Ne.y,r.x*Ne.z,r.y*Ne.w),H.viewport(o),V.updateMatrices(j,_e),n=V.getFrustum(),y(R,C,V.camera,j,this.type)}V.isPointLightShadow!==!0&&this.type===dn&&v(V,C),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(S,_,P)};function v(T,R){let C=e.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new _n(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,C,f,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,C,p,x,null)}function M(T,R,C,S){let _=null,P=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)_=P;else if(_=C.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let H=_.uuid,k=R.uuid,X=c[H];X===void 0&&(X={},c[H]=X);let J=X[k];J===void 0&&(J=_.clone(),X[k]=J,R.addEventListener("dispose",A)),_=J}if(_.visible=R.visible,_.wireframe=R.wireframe,S===dn?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:h[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let H=i.properties.get(_);H.light=C}return _}function y(T,R,C,S,_){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&_===dn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let k=e.update(T),X=T.material;if(Array.isArray(X)){let J=k.groups;for(let W=0,j=J.length;W<j;W++){let V=J[W],re=X[V.materialIndex];if(re&&re.visible){let fe=M(T,re,S,_);T.onBeforeShadow(i,T,R,C,k,fe,V),i.renderBufferDirect(C,null,k,fe,T,V),T.onAfterShadow(i,T,R,C,k,fe,V)}}}else if(X.visible){let J=M(T,X,S,_);T.onBeforeShadow(i,T,R,C,k,J,null),i.renderBufferDirect(C,null,k,J,T,null),T.onAfterShadow(i,T,R,C,k,J,null)}}let H=T.children;for(let k=0,X=H.length;k<X;k++)y(H[k],R,C,S,_)}function A(T){T.target.removeEventListener("dispose",A);for(let C in c){let S=c[C],_=T.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}var vE={[Mf]:Sf,[wf]:Af,[Tf]:Cf,[pr]:Ef,[Sf]:Mf,[Af]:wf,[Cf]:Tf,[Ef]:pr};function _E(i,e){function t(){let I=!1,oe=new Tt,G=null,Z=new Tt(0,0,0,0);return{setMask:function(he){G!==he&&!I&&(i.colorMask(he,he,he,he),G=he)},setLocked:function(he){I=he},setClear:function(he,ce,De,_t,kt){kt===!0&&(he*=_t,ce*=_t,De*=_t),oe.set(he,ce,De,_t),Z.equals(oe)===!1&&(i.clearColor(he,ce,De,_t),Z.copy(oe))},reset:function(){I=!1,G=null,Z.set(-1,0,0,0)}}}function n(){let I=!1,oe=!1,G=null,Z=null,he=null;return{setReversed:function(ce){if(oe!==ce){let De=e.get("EXT_clip_control");oe?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT);let _t=he;he=null,this.setClear(_t)}oe=ce},getReversed:function(){return oe},setTest:function(ce){ce?ne(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(ce){G!==ce&&!I&&(i.depthMask(ce),G=ce)},setFunc:function(ce){if(oe&&(ce=vE[ce]),Z!==ce){switch(ce){case Mf:i.depthFunc(i.NEVER);break;case Sf:i.depthFunc(i.ALWAYS);break;case wf:i.depthFunc(i.LESS);break;case pr:i.depthFunc(i.LEQUAL);break;case Tf:i.depthFunc(i.EQUAL);break;case Ef:i.depthFunc(i.GEQUAL);break;case Af:i.depthFunc(i.GREATER);break;case Cf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ce}},setLocked:function(ce){I=ce},setClear:function(ce){he!==ce&&(oe&&(ce=1-ce),i.clearDepth(ce),he=ce)},reset:function(){I=!1,G=null,Z=null,he=null,oe=!1}}}function s(){let I=!1,oe=null,G=null,Z=null,he=null,ce=null,De=null,_t=null,kt=null;return{setTest:function(et){I||(et?ne(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(et){oe!==et&&!I&&(i.stencilMask(et),oe=et)},setFunc:function(et,Pi,on){(G!==et||Z!==Pi||he!==on)&&(i.stencilFunc(et,Pi,on),G=et,Z=Pi,he=on)},setOp:function(et,Pi,on){(ce!==et||De!==Pi||_t!==on)&&(i.stencilOp(et,Pi,on),ce=et,De=Pi,_t=on)},setLocked:function(et){I=et},setClear:function(et){kt!==et&&(i.clearStencil(et),kt=et)},reset:function(){I=!1,oe=null,G=null,Z=null,he=null,ce=null,De=null,_t=null,kt=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,u={},h={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,v=null,M=null,y=null,A=null,T=null,R=new Ye(0,0,0),C=0,S=!1,_=null,P=null,H=null,k=null,X=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,j=0,V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=j>=1):V.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=j>=2);let re=null,fe={},_e=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),Ze=new Tt().fromArray(_e),q=new Tt().fromArray(Ne);function Q(I,oe,G,Z){let he=new Uint8Array(4),ce=i.createTexture();i.bindTexture(I,ce),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<G;De++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(oe+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return ce}let ge={};ge[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(i.DEPTH_TEST),o.setFunc(pr),Ve(!1),He(om),ne(i.CULL_FACE),O(Hn);function ne(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function we(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Ce(I,oe){return h[I]!==oe?(i.bindFramebuffer(I,oe),h[I]=oe,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function ze(I,oe){let G=p,Z=!1;if(I){G=f.get(oe),G===void 0&&(G=[],f.set(oe,G));let he=I.textures;if(G.length!==he.length||G[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,De=he.length;ce<De;ce++)G[ce]=i.COLOR_ATTACHMENT0+ce;G.length=he.length,Z=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,Z=!0);Z&&i.drawBuffers(G)}function gt(I){return g!==I?(i.useProgram(I),g=I,!0):!1}let We={[bs]:i.FUNC_ADD,[D0]:i.FUNC_SUBTRACT,[L0]:i.FUNC_REVERSE_SUBTRACT};We[O0]=i.MIN,We[U0]=i.MAX;let wt={[N0]:i.ZERO,[F0]:i.ONE,[B0]:i.SRC_COLOR,[_f]:i.SRC_ALPHA,[W0]:i.SRC_ALPHA_SATURATE,[H0]:i.DST_COLOR,[k0]:i.DST_ALPHA,[z0]:i.ONE_MINUS_SRC_COLOR,[bf]:i.ONE_MINUS_SRC_ALPHA,[G0]:i.ONE_MINUS_DST_COLOR,[V0]:i.ONE_MINUS_DST_ALPHA,[X0]:i.CONSTANT_COLOR,[q0]:i.ONE_MINUS_CONSTANT_COLOR,[Y0]:i.CONSTANT_ALPHA,[$0]:i.ONE_MINUS_CONSTANT_ALPHA};function O(I,oe,G,Z,he,ce,De,_t,kt,et){if(I===Hn){x===!0&&(we(i.BLEND),x=!1);return}if(x===!1&&(ne(i.BLEND),x=!0),I!==I0){if(I!==m||et!==S){if((d!==bs||y!==bs)&&(i.blendEquation(i.FUNC_ADD),d=bs,y=bs),et)switch(I){case cr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vf:i.blendFunc(i.ONE,i.ONE);break;case am:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lm:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case cr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vf:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case am:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lm:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}v=null,M=null,A=null,T=null,R.set(0,0,0),C=0,m=I,S=et}return}he=he||oe,ce=ce||G,De=De||Z,(oe!==d||he!==y)&&(i.blendEquationSeparate(We[oe],We[he]),d=oe,y=he),(G!==v||Z!==M||ce!==A||De!==T)&&(i.blendFuncSeparate(wt[G],wt[Z],wt[ce],wt[De]),v=G,M=Z,A=ce,T=De),(_t.equals(R)===!1||kt!==C)&&(i.blendColor(_t.r,_t.g,_t.b,kt),R.copy(_t),C=kt),m=I,S=!1}function gi(I,oe){I.side===mn?we(i.CULL_FACE):ne(i.CULL_FACE);let G=I.side===Zt;oe&&(G=!G),Ve(G),I.blending===cr&&I.transparent===!1?O(Hn):O(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let Z=I.stencilWrite;a.setTest(Z),Z&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),at(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(I){_!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),_=I)}function He(I){I!==C0?(ne(i.CULL_FACE),I!==P&&(I===om?i.cullFace(i.BACK):I===R0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),P=I}function Ee(I){I!==H&&(W&&i.lineWidth(I),H=I)}function at(I,oe,G){I?(ne(i.POLYGON_OFFSET_FILL),(k!==oe||X!==G)&&(i.polygonOffset(oe,G),k=oe,X=G)):we(i.POLYGON_OFFSET_FILL)}function Te(I){I?ne(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function E(I){I===void 0&&(I=i.TEXTURE0+J-1),re!==I&&(i.activeTexture(I),re=I)}function b(I,oe,G){G===void 0&&(re===null?G=i.TEXTURE0+J-1:G=re);let Z=fe[G];Z===void 0&&(Z={type:void 0,texture:void 0},fe[G]=Z),(Z.type!==I||Z.texture!==oe)&&(re!==G&&(i.activeTexture(G),re=G),i.bindTexture(I,oe||ge[I]),Z.type=I,Z.texture=oe)}function F(){let I=fe[re];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Xe(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(I){Ze.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ze.copy(I))}function me(I){q.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),q.copy(I))}function Ge(I,oe){let G=c.get(oe);G===void 0&&(G=new WeakMap,c.set(oe,G));let Z=G.get(I);Z===void 0&&(Z=i.getUniformBlockIndex(oe,I.name),G.set(I,Z))}function Fe(I,oe){let Z=c.get(oe).get(I);l.get(oe)!==Z&&(i.uniformBlockBinding(oe,Z,I.__bindingPointIndex),l.set(oe,Z))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},re=null,fe={},h={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,v=null,M=null,y=null,A=null,T=null,R=new Ye(0,0,0),C=0,S=!1,_=null,P=null,H=null,k=null,X=null,Ze.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ne,disable:we,bindFramebuffer:Ce,drawBuffers:ze,useProgram:gt,setBlending:O,setMaterial:gi,setFlipSided:Ve,setCullFace:He,setLineWidth:Ee,setPolygonOffset:at,setScissorTest:Te,activeTexture:E,bindTexture:b,unbindTexture:F,compressedTexImage2D:$,compressedTexImage3D:K,texImage2D:pe,texImage3D:Re,updateUBOMapping:Ge,uniformBlockBinding:Fe,texStorage2D:Xe,texStorage3D:ee,texSubImage2D:Y,texSubImage3D:be,compressedTexSubImage2D:le,compressedTexSubImage3D:de,scissor:Pe,viewport:me,reset:st}}function rg(i,e,t,n){let s=bE(n);switch(t){case yg:return i*e;case _g:return i*e;case bg:return i*e*2;case Mg:return i*e/s.components*s.byteLength;case qd:return i*e/s.components*s.byteLength;case Sg:return i*e*2/s.components*s.byteLength;case Yd:return i*e*2/s.components*s.byteLength;case vg:return i*e*3/s.components*s.byteLength;case Ui:return i*e*4/s.components*s.byteLength;case $d:return i*e*4/s.components*s.byteLength;case Ua:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fa:case Ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Of:case Nf:return Math.max(i,16)*Math.max(e,8)/4;case Lf:case Uf:return Math.max(i,8)*Math.max(e,8)/2;case Ff:case Bf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kf:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Vf:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Hf:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Gf:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Wf:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Xf:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case qf:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Yf:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $f:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Zf:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Kf:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Jf:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case jf:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Qf:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case za:case ed:case td:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wg:case id:return Math.ceil(i/4)*Math.ceil(e/4)*8;case nd:case sd:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bE(i){switch(i){case vn:case mg:return{byteLength:1,components:1};case Ao:case gg:case Do:return{byteLength:2,components:1};case Wd:case Xd:return{byteLength:2,components:4};case Es:case Gd:case gn:return{byteLength:4,components:1};case xg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function ME(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new je,u=new WeakMap,h,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,b){return p?new OffscreenCanvas(E,b):Ha("canvas")}function x(E,b,F){let $=1,K=Te(E);if((K.width>F||K.height>F)&&($=F/Math.max(K.width,K.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let Y=Math.floor($*K.width),be=Math.floor($*K.height);h===void 0&&(h=g(Y,be));let le=b?g(Y,be):h;return le.width=Y,le.height=be,le.getContext("2d").drawImage(E,0,0,Y,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Y+"x"+be+")."),le}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function m(E){return E.generateMipmaps}function d(E){i.generateMipmap(E)}function v(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(E,b,F,$,K=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=b;if(b===i.RED&&(F===i.FLOAT&&(Y=i.R32F),F===i.HALF_FLOAT&&(Y=i.R16F),F===i.UNSIGNED_BYTE&&(Y=i.R8)),b===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.R8UI),F===i.UNSIGNED_SHORT&&(Y=i.R16UI),F===i.UNSIGNED_INT&&(Y=i.R32UI),F===i.BYTE&&(Y=i.R8I),F===i.SHORT&&(Y=i.R16I),F===i.INT&&(Y=i.R32I)),b===i.RG&&(F===i.FLOAT&&(Y=i.RG32F),F===i.HALF_FLOAT&&(Y=i.RG16F),F===i.UNSIGNED_BYTE&&(Y=i.RG8)),b===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RG8UI),F===i.UNSIGNED_SHORT&&(Y=i.RG16UI),F===i.UNSIGNED_INT&&(Y=i.RG32UI),F===i.BYTE&&(Y=i.RG8I),F===i.SHORT&&(Y=i.RG16I),F===i.INT&&(Y=i.RG32I)),b===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),F===i.UNSIGNED_INT&&(Y=i.RGB32UI),F===i.BYTE&&(Y=i.RGB8I),F===i.SHORT&&(Y=i.RGB16I),F===i.INT&&(Y=i.RGB32I)),b===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),F===i.UNSIGNED_INT&&(Y=i.RGBA32UI),F===i.BYTE&&(Y=i.RGBA8I),F===i.SHORT&&(Y=i.RGBA16I),F===i.INT&&(Y=i.RGBA32I)),b===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),b===i.RGBA){let be=K?al:qe.getTransfer($);F===i.FLOAT&&(Y=i.RGBA32F),F===i.HALF_FLOAT&&(Y=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Y=be===tt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(E,b){let F;return E?b===null||b===Es||b===xr?F=i.DEPTH24_STENCIL8:b===gn?F=i.DEPTH32F_STENCIL8:b===Ao&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Es||b===xr?F=i.DEPTH_COMPONENT24:b===gn?F=i.DEPTH_COMPONENT32F:b===Ao&&(F=i.DEPTH_COMPONENT16),F}function A(E,b){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ni&&E.minFilter!==qi?Math.log2(Math.max(b.width,b.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?b.mipmaps.length:1}function T(E){let b=E.target;b.removeEventListener("dispose",T),C(b),b.isVideoTexture&&u.delete(b)}function R(E){let b=E.target;b.removeEventListener("dispose",R),_(b)}function C(E){let b=n.get(E);if(b.__webglInit===void 0)return;let F=E.source,$=f.get(F);if($){let K=$[b.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(E),Object.keys($).length===0&&f.delete(F)}n.remove(E)}function S(E){let b=n.get(E);i.deleteTexture(b.__webglTexture);let F=E.source,$=f.get(F);delete $[b.__cacheKey],o.memory.textures--}function _(E){let b=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(b.__webglFramebuffer[$]))for(let K=0;K<b.__webglFramebuffer[$].length;K++)i.deleteFramebuffer(b.__webglFramebuffer[$][K]);else i.deleteFramebuffer(b.__webglFramebuffer[$]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[$])}else{if(Array.isArray(b.__webglFramebuffer))for(let $=0;$<b.__webglFramebuffer.length;$++)i.deleteFramebuffer(b.__webglFramebuffer[$]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let $=0;$<b.__webglColorRenderbuffer.length;$++)b.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[$]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let F=E.textures;for(let $=0,K=F.length;$<K;$++){let Y=n.get(F[$]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(F[$])}n.remove(E)}let P=0;function H(){P=0}function k(){let E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function X(E){let b=[];return b.push(E.wrapS),b.push(E.wrapT),b.push(E.wrapR||0),b.push(E.magFilter),b.push(E.minFilter),b.push(E.anisotropy),b.push(E.internalFormat),b.push(E.format),b.push(E.type),b.push(E.generateMipmaps),b.push(E.premultiplyAlpha),b.push(E.flipY),b.push(E.unpackAlignment),b.push(E.colorSpace),b.join()}function J(E,b){let F=n.get(E);if(E.isVideoTexture&&Ee(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){let $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,E,b);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+b)}function W(E,b){let F=n.get(E);if(E.version>0&&F.__version!==E.version){q(F,E,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+b)}function j(E,b){let F=n.get(E);if(E.version>0&&F.__version!==E.version){q(F,E,b);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+b)}function V(E,b){let F=n.get(E);if(E.version>0&&F.__version!==E.version){Q(F,E,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+b)}let re={[If]:i.REPEAT,[Ss]:i.CLAMP_TO_EDGE,[Df]:i.MIRRORED_REPEAT},fe={[Ni]:i.NEAREST,[sb]:i.NEAREST_MIPMAP_NEAREST,[oa]:i.NEAREST_MIPMAP_LINEAR,[qi]:i.LINEAR,[Hh]:i.LINEAR_MIPMAP_NEAREST,[ws]:i.LINEAR_MIPMAP_LINEAR},_e={[cb]:i.NEVER,[mb]:i.ALWAYS,[ub]:i.LESS,[Tg]:i.LEQUAL,[hb]:i.EQUAL,[pb]:i.GEQUAL,[fb]:i.GREATER,[db]:i.NOTEQUAL};function Ne(E,b){if(b.type===gn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===qi||b.magFilter===Hh||b.magFilter===oa||b.magFilter===ws||b.minFilter===qi||b.minFilter===Hh||b.minFilter===oa||b.minFilter===ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,re[b.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,re[b.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,re[b.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,fe[b.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,fe[b.minFilter]),b.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,_e[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ni||b.minFilter!==oa&&b.minFilter!==ws||b.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ze(E,b){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,b.addEventListener("dispose",T));let $=b.source,K=f.get($);K===void 0&&(K={},f.set($,K));let Y=X(b);if(Y!==E.__cacheKey){K[Y]===void 0&&(K[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[Y].usedTimes++;let be=K[E.__cacheKey];be!==void 0&&(K[E.__cacheKey].usedTimes--,be.usedTimes===0&&S(b)),E.__cacheKey=Y,E.__webglTexture=K[Y].texture}return F}function q(E,b,F){let $=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&($=i.TEXTURE_3D);let K=Ze(E,b),Y=b.source;t.bindTexture($,E.__webglTexture,i.TEXTURE0+F);let be=n.get(Y);if(Y.version!==be.__version||K===!0){t.activeTexture(i.TEXTURE0+F);let le=qe.getPrimaries(qe.workingColorSpace),de=b.colorSpace===kn?null:qe.getPrimaries(b.colorSpace),Xe=b.colorSpace===kn||le===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let ee=x(b.image,!1,s.maxTextureSize);ee=at(b,ee);let pe=r.convert(b.format,b.colorSpace),Re=r.convert(b.type),Pe=M(b.internalFormat,pe,Re,b.colorSpace,b.isVideoTexture);Ne($,b);let me,Ge=b.mipmaps,Fe=b.isVideoTexture!==!0,st=be.__version===void 0||K===!0,I=Y.dataReady,oe=A(b,ee);if(b.isDepthTexture)Pe=y(b.format===yr,b.type),st&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,Pe,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ee.width,ee.height,0,pe,Re,null));else if(b.isDataTexture)if(Ge.length>0){Fe&&st&&t.texStorage2D(i.TEXTURE_2D,oe,Pe,Ge[0].width,Ge[0].height);for(let G=0,Z=Ge.length;G<Z;G++)me=Ge[G],Fe?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,Re,me.data):t.texImage2D(i.TEXTURE_2D,G,Pe,me.width,me.height,0,pe,Re,me.data);b.generateMipmaps=!1}else Fe?(st&&t.texStorage2D(i.TEXTURE_2D,oe,Pe,ee.width,ee.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,pe,Re,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Pe,ee.width,ee.height,0,pe,Re,ee.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Fe&&st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Pe,Ge[0].width,Ge[0].height,ee.depth);for(let G=0,Z=Ge.length;G<Z;G++)if(me=Ge[G],b.format!==Ui)if(pe!==null)if(Fe){if(I)if(b.layerUpdates.size>0){let he=rg(me.width,me.height,b.format,b.type);for(let ce of b.layerUpdates){let De=me.data.subarray(ce*he/me.data.BYTES_PER_ELEMENT,(ce+1)*he/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,ce,me.width,me.height,1,pe,De)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,ee.depth,pe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Pe,me.width,me.height,ee.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,ee.depth,pe,Re,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Pe,me.width,me.height,ee.depth,0,pe,Re,me.data)}else{Fe&&st&&t.texStorage2D(i.TEXTURE_2D,oe,Pe,Ge[0].width,Ge[0].height);for(let G=0,Z=Ge.length;G<Z;G++)me=Ge[G],b.format!==Ui?pe!==null?Fe?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Pe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,Re,me.data):t.texImage2D(i.TEXTURE_2D,G,Pe,me.width,me.height,0,pe,Re,me.data)}else if(b.isDataArrayTexture)if(Fe){if(st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Pe,ee.width,ee.height,ee.depth),I)if(b.layerUpdates.size>0){let G=rg(ee.width,ee.height,b.format,b.type);for(let Z of b.layerUpdates){let he=ee.data.subarray(Z*G/ee.data.BYTES_PER_ELEMENT,(Z+1)*G/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,ee.width,ee.height,1,pe,Re,he)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,pe,Re,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ee.width,ee.height,ee.depth,0,pe,Re,ee.data);else if(b.isData3DTexture)Fe?(st&&t.texStorage3D(i.TEXTURE_3D,oe,Pe,ee.width,ee.height,ee.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,pe,Re,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ee.width,ee.height,ee.depth,0,pe,Re,ee.data);else if(b.isFramebufferTexture){if(st)if(Fe)t.texStorage2D(i.TEXTURE_2D,oe,Pe,ee.width,ee.height);else{let G=ee.width,Z=ee.height;for(let he=0;he<oe;he++)t.texImage2D(i.TEXTURE_2D,he,Pe,G,Z,0,pe,Re,null),G>>=1,Z>>=1}}else if(Ge.length>0){if(Fe&&st){let G=Te(Ge[0]);t.texStorage2D(i.TEXTURE_2D,oe,Pe,G.width,G.height)}for(let G=0,Z=Ge.length;G<Z;G++)me=Ge[G],Fe?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,pe,Re,me):t.texImage2D(i.TEXTURE_2D,G,Pe,pe,Re,me);b.generateMipmaps=!1}else if(Fe){if(st){let G=Te(ee);t.texStorage2D(i.TEXTURE_2D,oe,Pe,G.width,G.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Re,ee)}else t.texImage2D(i.TEXTURE_2D,0,Pe,pe,Re,ee);m(b)&&d($),be.__version=Y.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function Q(E,b,F){if(b.image.length!==6)return;let $=Ze(E,b),K=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);let Y=n.get(K);if(K.version!==Y.__version||$===!0){t.activeTexture(i.TEXTURE0+F);let be=qe.getPrimaries(qe.workingColorSpace),le=b.colorSpace===kn?null:qe.getPrimaries(b.colorSpace),de=b.colorSpace===kn||be===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Xe=b.isCompressedTexture||b.image[0].isCompressedTexture,ee=b.image[0]&&b.image[0].isDataTexture,pe=[];for(let Z=0;Z<6;Z++)!Xe&&!ee?pe[Z]=x(b.image[Z],!0,s.maxCubemapSize):pe[Z]=ee?b.image[Z].image:b.image[Z],pe[Z]=at(b,pe[Z]);let Re=pe[0],Pe=r.convert(b.format,b.colorSpace),me=r.convert(b.type),Ge=M(b.internalFormat,Pe,me,b.colorSpace),Fe=b.isVideoTexture!==!0,st=Y.__version===void 0||$===!0,I=K.dataReady,oe=A(b,Re);Ne(i.TEXTURE_CUBE_MAP,b);let G;if(Xe){Fe&&st&&t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ge,Re.width,Re.height);for(let Z=0;Z<6;Z++){G=pe[Z].mipmaps;for(let he=0;he<G.length;he++){let ce=G[he];b.format!==Ui?Pe!==null?Fe?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,ce.width,ce.height,Pe,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,Ge,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,ce.width,ce.height,Pe,me,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,Ge,ce.width,ce.height,0,Pe,me,ce.data)}}}else{if(G=b.mipmaps,Fe&&st){G.length>0&&oe++;let Z=Te(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ee){Fe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,pe[Z].width,pe[Z].height,Pe,me,pe[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,pe[Z].width,pe[Z].height,0,Pe,me,pe[Z].data);for(let he=0;he<G.length;he++){let De=G[he].image[Z].image;Fe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,De.width,De.height,Pe,me,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,Ge,De.width,De.height,0,Pe,me,De.data)}}else{Fe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pe,me,pe[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Pe,me,pe[Z]);for(let he=0;he<G.length;he++){let ce=G[he];Fe?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,Pe,me,ce.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,Ge,Pe,me,ce.image[Z])}}}m(b)&&d(i.TEXTURE_CUBE_MAP),Y.__version=K.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function ge(E,b,F,$,K,Y){let be=r.convert(F.format,F.colorSpace),le=r.convert(F.type),de=M(F.internalFormat,be,le,F.colorSpace),Xe=n.get(b),ee=n.get(F);if(ee.__renderTarget=b,!Xe.__hasExternalTextures){let pe=Math.max(1,b.width>>Y),Re=Math.max(1,b.height>>Y);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,Y,de,pe,Re,b.depth,0,be,le,null):t.texImage2D(K,Y,de,pe,Re,0,be,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),He(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,K,ee.__webglTexture,0,Ve(b)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,K,ee.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(E,b,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),b.depthBuffer){let $=b.depthTexture,K=$&&$.isDepthTexture?$.type:null,Y=y(b.stencilBuffer,K),be=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=Ve(b);He(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,Y,b.width,b.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,Y,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Y,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,E)}else{let $=b.textures;for(let K=0;K<$.length;K++){let Y=$[K],be=r.convert(Y.format,Y.colorSpace),le=r.convert(Y.type),de=M(Y.internalFormat,be,le,Y.colorSpace),Xe=Ve(b);F&&He(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,de,b.width,b.height):He(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe,de,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,de,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(E,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(b.depthTexture);$.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J(b.depthTexture,0);let K=$.__webglTexture,Y=Ve(b);if(b.depthTexture.format===ur)He(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(b.depthTexture.format===yr)He(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ce(E){let b=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==E.depthTexture){let $=E.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),$){let K=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,$.removeEventListener("dispose",K)};$.addEventListener("dispose",K),b.__depthDisposeCallback=K}b.__boundDepthTexture=$}if(E.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");we(b.__webglFramebuffer,E)}else if(F){b.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[$]),b.__webglDepthbuffer[$]===void 0)b.__webglDepthbuffer[$]=i.createRenderbuffer(),ne(b.__webglDepthbuffer[$],E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ne(b.__webglDepthbuffer,E,!1);else{let $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,K)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(E,b,F){let $=n.get(E);b!==void 0&&ge($.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ce(E)}function gt(E){let b=E.texture,F=n.get(E),$=n.get(b);E.addEventListener("dispose",R);let K=E.textures,Y=E.isWebGLCubeRenderTarget===!0,be=K.length>1;if(be||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=b.version,o.memory.textures++),Y){F.__webglFramebuffer=[];for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[le]=[];for(let de=0;de<b.mipmaps.length;de++)F.__webglFramebuffer[le][de]=i.createFramebuffer()}else F.__webglFramebuffer[le]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let le=0;le<b.mipmaps.length;le++)F.__webglFramebuffer[le]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(be)for(let le=0,de=K.length;le<de;le++){let Xe=n.get(K[le]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&He(E)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let le=0;le<K.length;le++){let de=K[le];F.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[le]);let Xe=r.convert(de.format,de.colorSpace),ee=r.convert(de.type),pe=M(de.internalFormat,Xe,ee,de.colorSpace,E.isXRRenderTarget===!0),Re=Ve(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,pe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,F.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,b);for(let le=0;le<6;le++)if(b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)ge(F.__webglFramebuffer[le][de],E,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,de);else ge(F.__webglFramebuffer[le],E,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(b)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let le=0,de=K.length;le<de;le++){let Xe=K[le],ee=n.get(Xe);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Ne(i.TEXTURE_2D,Xe),ge(F.__webglFramebuffer,E,Xe,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,0),m(Xe)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,$.__webglTexture),Ne(le,b),b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)ge(F.__webglFramebuffer[de],E,b,i.COLOR_ATTACHMENT0,le,de);else ge(F.__webglFramebuffer,E,b,i.COLOR_ATTACHMENT0,le,0);m(b)&&d(le),t.unbindTexture()}E.depthBuffer&&Ce(E)}function We(E){let b=E.textures;for(let F=0,$=b.length;F<$;F++){let K=b[F];if(m(K)){let Y=v(E),be=n.get(K).__webglTexture;t.bindTexture(Y,be),d(Y),t.unbindTexture()}}}let wt=[],O=[];function gi(E){if(E.samples>0){if(He(E)===!1){let b=E.textures,F=E.width,$=E.height,K=i.COLOR_BUFFER_BIT,Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(E),le=b.length>1;if(le)for(let de=0;de<b.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let de=0;de<b.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[de]);let Xe=n.get(b[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xe,0)}i.blitFramebuffer(0,0,F,$,0,0,F,$,K,i.NEAREST),l===!0&&(wt.length=0,O.length=0,wt.push(i.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.resolveDepthBuffer===!1&&(wt.push(Y),O.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let de=0;de<b.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,be.__webglColorRenderbuffer[de]);let Xe=n.get(b[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let b=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Ve(E){return Math.min(s.maxSamples,E.samples)}function He(E){let b=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ee(E){let b=o.render.frame;u.get(E)!==b&&(u.set(E,b),E.update())}function at(E,b){let F=E.colorSpace,$=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==br&&F!==kn&&(qe.getTransfer(F)===tt?($!==Ui||K!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function Te(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=H,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=V,this.rebindTextures=ze,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=gi,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=He}function SE(i,e){function t(n,s=kn){let r,o=qe.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===Wd)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xd)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===mg)return i.BYTE;if(n===gg)return i.SHORT;if(n===Ao)return i.UNSIGNED_SHORT;if(n===Gd)return i.INT;if(n===Es)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===Do)return i.HALF_FLOAT;if(n===yg)return i.ALPHA;if(n===vg)return i.RGB;if(n===Ui)return i.RGBA;if(n===_g)return i.LUMINANCE;if(n===bg)return i.LUMINANCE_ALPHA;if(n===ur)return i.DEPTH_COMPONENT;if(n===yr)return i.DEPTH_STENCIL;if(n===Mg)return i.RED;if(n===qd)return i.RED_INTEGER;if(n===Sg)return i.RG;if(n===Yd)return i.RG_INTEGER;if(n===$d)return i.RGBA_INTEGER;if(n===Ua||n===Na||n===Fa||n===Ba)if(o===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lf||n===Of||n===Uf||n===Nf)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Lf)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Of)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uf)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Nf)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ff||n===Bf||n===zf)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ff||n===Bf)return o===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===kf||n===Vf||n===Hf||n===Gf||n===Wf||n===Xf||n===qf||n===Yf||n===$f||n===Zf||n===Kf||n===Jf||n===jf||n===Qf)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===kf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Hf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$f)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Kf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qf)return o===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===za||n===ed||n===td)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===za)return o===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ed)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===td)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wg||n===id||n===nd||n===sd)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===za)return r.COMPRESSED_RED_RGTC1_EXT;if(n===id)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nd)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sd)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var _d=class extends ii{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ts=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},wE={type:"move"},Eo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ts,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ts,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ts,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wE)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ts;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},TE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,EE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new bi,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Fi({vertexShader:TE,fragmentShader:EE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _i(new Ja(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Md=class extends Xn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null,x=new bd,m=t.getContextAttributes(),d=null,v=null,M=[],y=[],A=new je,T=null,R=new ii;R.viewport=new Tt;let C=new ii;C.viewport=new Tt;let S=[R,C],_=new _d,P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=M[q];return Q===void 0&&(Q=new Eo,M[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=M[q];return Q===void 0&&(Q=new Eo,M[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=M[q];return Q===void 0&&(Q=new Eo,M[q]=Q),Q.getHandSpace()};function k(q){let Q=y.indexOf(q.inputSource);if(Q===-1)return;let ge=M[Q];ge!==void 0&&(ge.update(q.inputSource,q.frame,c||o),ge.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",J);for(let q=0;q<M.length;q++){let Q=y[q];Q!==null&&(y[q]=null,M[q].disconnect(Q))}P=null,H=null,x.reset(),e.setRenderTarget(d),p=null,f=null,h=null,s=null,v=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",X),s.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){let Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new _n(p.framebufferWidth,p.framebufferHeight,{format:Ui,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,ge=null,ne=null;m.depth&&(ne=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=m.stencil?yr:ur,ge=m.stencil?xr:Es);let we={colorFormat:t.RGBA8,depthFormat:ne,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(we),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new _n(f.textureWidth,f.textureHeight,{format:Ui,type:vn,depthTexture:new Qa(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(q){for(let Q=0;Q<q.removed.length;Q++){let ge=q.removed[Q],ne=y.indexOf(ge);ne>=0&&(y[ne]=null,M[ne].disconnect(ge))}for(let Q=0;Q<q.added.length;Q++){let ge=q.added[Q],ne=y.indexOf(ge);if(ne===-1){for(let Ce=0;Ce<M.length;Ce++)if(Ce>=y.length){y.push(ge),ne=Ce;break}else if(y[Ce]===null){y[Ce]=ge,ne=Ce;break}if(ne===-1)break}let we=M[ne];we&&we.connect(ge)}}let W=new U,j=new U;function V(q,Q,ge){W.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);let ne=W.distanceTo(j),we=Q.projectionMatrix.elements,Ce=ge.projectionMatrix.elements,ze=we[14]/(we[10]-1),gt=we[14]/(we[10]+1),We=(we[9]+1)/we[5],wt=(we[9]-1)/we[5],O=(we[8]-1)/we[0],gi=(Ce[8]+1)/Ce[0],Ve=ze*O,He=ze*gi,Ee=ne/(-O+gi),at=Ee*-O;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(at),q.translateZ(Ee),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let Te=ze+Ee,E=gt+Ee,b=Ve-at,F=He+(ne-at),$=We*gt/E*Te,K=wt*gt/E*Te;q.projectionMatrix.makePerspective(b,F,$,K,Te,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function re(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Q=q.near,ge=q.far;x.texture!==null&&(x.depthNear>0&&(Q=x.depthNear),x.depthFar>0&&(ge=x.depthFar)),_.near=C.near=R.near=Q,_.far=C.far=R.far=ge,(P!==_.near||H!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),P=_.near,H=_.far),R.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,_.layers.mask=R.layers.mask|C.layers.mask;let ne=q.parent,we=_.cameras;re(_,ne);for(let Ce=0;Ce<we.length;Ce++)re(we[Ce],ne);we.length===2?V(_,R,C):_.projectionMatrix.copy(R.projectionMatrix),fe(q,_,ne)};function fe(q,Q,ge){ge===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(ge.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Co*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let _e=null;function Ne(q,Q){if(u=Q.getViewerPose(c||o),g=Q,u!==null){let ge=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ne=!1;ge.length!==_.cameras.length&&(_.cameras.length=0,ne=!0);for(let Ce=0;Ce<ge.length;Ce++){let ze=ge[Ce],gt=null;if(p!==null)gt=p.getViewport(ze);else{let wt=h.getViewSubImage(f,ze);gt=wt.viewport,Ce===0&&(e.setRenderTargetTextures(v,wt.colorTexture,f.ignoreDepthValues?void 0:wt.depthStencilTexture),e.setRenderTarget(v))}let We=S[Ce];We===void 0&&(We=new ii,We.layers.enable(Ce),We.viewport=new Tt,S[Ce]=We),We.matrix.fromArray(ze.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(ze.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(gt.x,gt.y,gt.width,gt.height),Ce===0&&(_.matrix.copy(We.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ne===!0&&_.cameras.push(We)}let we=s.enabledFeatures;if(we&&we.includes("depth-sensing")){let Ce=h.getDepthInformation(ge[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(e,Ce,s.renderState)}}for(let ge=0;ge<M.length;ge++){let ne=y[ge],we=M[ge];ne!==null&&we!==void 0&&we.update(ne,Q,c||o)}_e&&_e(q,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}let Ze=new Rg;Ze.setAnimationLoop(Ne),this.setAnimationLoop=function(q){_e=q},this.dispose=function(){}}},vs=new bn,AE=new Et;function CE(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Cg(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,v,M,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,v,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Zt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Zt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,vs.copy(y),vs.x*=-1,vs.y*=-1,vs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),m.envMapRotation.value.setFromMatrix4(AE.makeRotationFromEuler(vs)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,v,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Zt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function RE(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){let y=M.program;n.uniformBlockBinding(v,y)}function c(v,M){let y=s[v.id];y===void 0&&(g(v),y=u(v),s[v.id]=y,v.addEventListener("dispose",m));let A=M.program;n.updateUBOMapping(v,A);let T=e.render.frame;r[v.id]!==T&&(f(v),r[v.id]=T)}function u(v){let M=h();v.__bindingPointIndex=M;let y=i.createBuffer(),A=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let M=s[v.id],y=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,R=y.length;T<R;T++){let C=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,_=C.length;S<_;S++){let P=C[S];if(p(P,T,S,A)===!0){let H=P.__offset,k=Array.isArray(P.value)?P.value:[P.value],X=0;for(let J=0;J<k.length;J++){let W=k[J],j=x(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+X,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,X),X+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,M,y,A){let T=v.value,R=M+"_"+y;if(A[R]===void 0)return typeof T=="number"||typeof T=="boolean"?A[R]=T:A[R]=T.clone(),!0;{let C=A[R];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return A[R]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function g(v){let M=v.uniforms,y=0,A=16;for(let R=0,C=M.length;R<C;R++){let S=Array.isArray(M[R])?M[R]:[M[R]];for(let _=0,P=S.length;_<P;_++){let H=S[_],k=Array.isArray(H.value)?H.value:[H.value];for(let X=0,J=k.length;X<J;X++){let W=k[X],j=x(W),V=y%A,re=V%j.boundary,fe=V+re;y+=re,fe!==0&&A-fe<j.storage&&(y+=A-fe),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=j.storage}}}let T=y%A;return T>0&&(y+=A-T),v.__size=y,v.__cache={},this}function x(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){let M=v.target;M.removeEventListener("dispose",m);let y=o.indexOf(M.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}var Sd=class{constructor(e={}){let{canvas:t=Lb(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vi,this.toneMapping=Gn,this.toneMappingExposure=1;let y=this,A=!1,T=0,R=0,C=null,S=-1,_=null,P=new Tt,H=new Tt,k=null,X=new Ye(0),J=0,W=t.width,j=t.height,V=1,re=null,fe=null,_e=new Tt(0,0,W,j),Ne=new Tt(0,0,W,j),Ze=!1,q=new Ka,Q=!1,ge=!1,ne=new Et,we=new Et,Ce=new U,ze=new Tt,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function wt(){return C===null?V:1}let O=n;function gi(w,D){return t.getContext(w,D)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ce,!1),O===null){let D="webgl2";if(O=gi(D,w),O===null)throw gi(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ve,He,Ee,at,Te,E,b,F,$,K,Y,be,le,de,Xe,ee,pe,Re,Pe,me,Ge,Fe,st,I;function oe(){Ve=new Xw(O),Ve.init(),Fe=new SE(O,Ve),He=new zw(O,Ve,e,Fe),Ee=new _E(O,Ve),He.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),at=new $w(O),Te=new aE,E=new ME(O,Ve,Ee,Te,He,Fe,at),b=new Vw(y),F=new Ww(y),$=new tM(O),st=new Fw(O,$),K=new qw(O,$,at,st),Y=new Kw(O,K,$,at),Pe=new Zw(O,He,E),ee=new kw(Te),be=new oE(y,b,F,Ve,He,st,ee),le=new CE(y,Te),de=new cE,Xe=new mE(Ve),Re=new Nw(y,b,F,Ee,Y,p,l),pe=new yE(y,Y,He),I=new RE(O,at,He,Ee),me=new Bw(O,Ve,at),Ge=new Yw(O,Ve,at),at.programs=be.programs,y.capabilities=He,y.extensions=Ve,y.properties=Te,y.renderLists=de,y.shadowMap=pe,y.state=Ee,y.info=at}oe();let G=new Md(y,O);this.xr=G,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=Ve.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Ve.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(w){w!==void 0&&(V=w,this.setSize(W,j,!1))},this.getSize=function(w){return w.set(W,j)},this.setSize=function(w,D,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=w,j=D,t.width=Math.floor(w*V),t.height=Math.floor(D*V),B===!0&&(t.style.width=w+"px",t.style.height=D+"px"),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(W*V,j*V).floor()},this.setDrawingBufferSize=function(w,D,B){W=w,j=D,V=B,t.width=Math.floor(w*B),t.height=Math.floor(D*B),this.setViewport(0,0,w,D)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(_e)},this.setViewport=function(w,D,B,z){w.isVector4?_e.set(w.x,w.y,w.z,w.w):_e.set(w,D,B,z),Ee.viewport(P.copy(_e).multiplyScalar(V).round())},this.getScissor=function(w){return w.copy(Ne)},this.setScissor=function(w,D,B,z){w.isVector4?Ne.set(w.x,w.y,w.z,w.w):Ne.set(w,D,B,z),Ee.scissor(H.copy(Ne).multiplyScalar(V).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(w){Ee.setScissorTest(Ze=w)},this.setOpaqueSort=function(w){re=w},this.setTransparentSort=function(w){fe=w},this.getClearColor=function(w){return w.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(w=!0,D=!0,B=!0){let z=0;if(w){let L=!1;if(C!==null){let te=C.texture.format;L=te===$d||te===Yd||te===qd}if(L){let te=C.texture.type,ue=te===vn||te===Es||te===Ao||te===xr||te===Wd||te===Xd,xe=Re.getClearColor(),ye=Re.getClearAlpha(),Ie=xe.r,Le=xe.g,ve=xe.b;ue?(g[0]=Ie,g[1]=Le,g[2]=ve,g[3]=ye,O.clearBufferuiv(O.COLOR,0,g)):(x[0]=Ie,x[1]=Le,x[2]=ve,x[3]=ye,O.clearBufferiv(O.COLOR,0,x))}else z|=O.COLOR_BUFFER_BIT}D&&(z|=O.DEPTH_BUFFER_BIT),B&&(z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),de.dispose(),Xe.dispose(),Te.dispose(),b.dispose(),F.dispose(),Y.dispose(),st.dispose(),I.dispose(),be.dispose(),G.dispose(),G.removeEventListener("sessionstart",jp),G.removeEventListener("sessionend",Qp),ds.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let w=at.autoReset,D=pe.enabled,B=pe.autoUpdate,z=pe.needsUpdate,L=pe.type;oe(),at.autoReset=w,pe.enabled=D,pe.autoUpdate=B,pe.needsUpdate=z,pe.type=L}function ce(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function De(w){let D=w.target;D.removeEventListener("dispose",De),_t(D)}function _t(w){kt(w),Te.remove(w)}function kt(w){let D=Te.get(w).programs;D!==void 0&&(D.forEach(function(B){be.releaseProgram(B)}),w.isShaderMaterial&&be.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,B,z,L,te){D===null&&(D=gt);let ue=L.isMesh&&L.matrixWorld.determinant()<0,xe=T0(w,D,B,z,L);Ee.setMaterial(z,ue);let ye=B.index,Ie=1;if(z.wireframe===!0){if(ye=K.getWireframeAttribute(B),ye===void 0)return;Ie=2}let Le=B.drawRange,ve=B.attributes.position,$e=Le.start*Ie,rt=(Le.start+Le.count)*Ie;te!==null&&($e=Math.max($e,te.start*Ie),rt=Math.min(rt,(te.start+te.count)*Ie)),ye!==null?($e=Math.max($e,0),rt=Math.min(rt,ye.count)):ve!=null&&($e=Math.max($e,0),rt=Math.min(rt,ve.count));let lt=rt-$e;if(lt<0||lt===1/0)return;st.setup(L,z,xe,B,ye);let ti,Ke=me;if(ye!==null&&(ti=$.get(ye),Ke=Ge,Ke.setIndex(ti)),L.isMesh)z.wireframe===!0?(Ee.setLineWidth(z.wireframeLinewidth*wt()),Ke.setMode(O.LINES)):Ke.setMode(O.TRIANGLES);else if(L.isLine){let Me=z.linewidth;Me===void 0&&(Me=1),Ee.setLineWidth(Me*wt()),L.isLineSegments?Ke.setMode(O.LINES):L.isLineLoop?Ke.setMode(O.LINE_LOOP):Ke.setMode(O.LINE_STRIP)}else L.isPoints?Ke.setMode(O.POINTS):L.isSprite&&Ke.setMode(O.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Ke.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Ke.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let Me=L._multiDrawStarts,an=L._multiDrawCounts,Je=L._multiDrawCount,Ii=ye?$.get(ye).bytesPerElement:1,qs=Te.get(z).currentProgram.getUniforms();for(let li=0;li<Je;li++)qs.setValue(O,"_gl_DrawID",li),Ke.render(Me[li]/Ii,an[li])}else if(L.isInstancedMesh)Ke.renderInstances($e,lt,L.count);else if(B.isInstancedBufferGeometry){let Me=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,an=Math.min(B.instanceCount,Me);Ke.renderInstances($e,lt,an)}else Ke.render($e,lt)};function et(w,D,B){w.transparent===!0&&w.side===mn&&w.forceSinglePass===!1?(w.side=Zt,w.needsUpdate=!0,ra(w,D,B),w.side=Wn,w.needsUpdate=!0,ra(w,D,B),w.side=mn):ra(w,D,B)}this.compile=function(w,D,B=null){B===null&&(B=w),d=Xe.get(B),d.init(D),M.push(d),B.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(d.pushLight(L),L.castShadow&&d.pushShadow(L))}),w!==B&&w.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(d.pushLight(L),L.castShadow&&d.pushShadow(L))}),d.setupLights();let z=new Set;return w.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let te=L.material;if(te)if(Array.isArray(te))for(let ue=0;ue<te.length;ue++){let xe=te[ue];et(xe,B,L),z.add(xe)}else et(te,B,L),z.add(te)}),M.pop(),d=null,z},this.compileAsync=function(w,D,B=null){let z=this.compile(w,D,B);return new Promise(L=>{function te(){if(z.forEach(function(ue){Te.get(ue).currentProgram.isReady()&&z.delete(ue)}),z.size===0){L(w);return}setTimeout(te,10)}Ve.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Pi=null;function on(w){Pi&&Pi(w)}function jp(){ds.stop()}function Qp(){ds.start()}let ds=new Rg;ds.setAnimationLoop(on),typeof self<"u"&&ds.setContext(self),this.setAnimationLoop=function(w){Pi=w,G.setAnimationLoop(w),w===null?ds.stop():ds.start()},G.addEventListener("sessionstart",jp),G.addEventListener("sessionend",Qp),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(D),D=G.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,D,C),d=Xe.get(w,M.length),d.init(D),M.push(d),we.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(we),ge=this.localClippingEnabled,Q=ee.init(this.clippingPlanes,ge),m=de.get(w,v.length),m.init(),v.push(m),G.enabled===!0&&G.isPresenting===!0){let te=y.xr.getDepthSensingMesh();te!==null&&Vh(te,D,-1/0,y.sortObjects)}Vh(w,D,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(re,fe),We=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,We&&Re.addToRenderList(m,w),this.info.render.frame++,Q===!0&&ee.beginShadows();let B=d.state.shadowsArray;pe.render(B,w,D),Q===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,L=m.transmissive;if(d.setupLights(),D.isArrayCamera){let te=D.cameras;if(L.length>0)for(let ue=0,xe=te.length;ue<xe;ue++){let ye=te[ue];tm(z,L,w,ye)}We&&Re.render(w);for(let ue=0,xe=te.length;ue<xe;ue++){let ye=te[ue];em(m,w,ye,ye.viewport)}}else L.length>0&&tm(z,L,w,D),We&&Re.render(w),em(m,w,D);C!==null&&(E.updateMultisampleRenderTarget(C),E.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(y,w,D),st.resetDefaultState(),S=-1,_=null,M.pop(),M.length>0?(d=M[M.length-1],Q===!0&&ee.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Vh(w,D,B,z){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLight)d.pushLight(w),w.castShadow&&d.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||q.intersectsSprite(w)){z&&ze.setFromMatrixPosition(w.matrixWorld).applyMatrix4(we);let ue=Y.update(w),xe=w.material;xe.visible&&m.push(w,ue,xe,B,ze.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||q.intersectsObject(w))){let ue=Y.update(w),xe=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ze.copy(w.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),ze.copy(ue.boundingSphere.center)),ze.applyMatrix4(w.matrixWorld).applyMatrix4(we)),Array.isArray(xe)){let ye=ue.groups;for(let Ie=0,Le=ye.length;Ie<Le;Ie++){let ve=ye[Ie],$e=xe[ve.materialIndex];$e&&$e.visible&&m.push(w,ue,$e,B,ze.z,ve)}}else xe.visible&&m.push(w,ue,xe,B,ze.z,null)}}let te=w.children;for(let ue=0,xe=te.length;ue<xe;ue++)Vh(te[ue],D,B,z)}function em(w,D,B,z){let L=w.opaque,te=w.transmissive,ue=w.transparent;d.setupLightsView(B),Q===!0&&ee.setGlobalState(y.clippingPlanes,B),z&&Ee.viewport(P.copy(z)),L.length>0&&sa(L,D,B),te.length>0&&sa(te,D,B),ue.length>0&&sa(ue,D,B),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function tm(w,D,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[z.id]===void 0&&(d.state.transmissionRenderTarget[z.id]=new _n(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Do:vn,minFilter:ws,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));let te=d.state.transmissionRenderTarget[z.id],ue=z.viewport||P;te.setSize(ue.z,ue.w);let xe=y.getRenderTarget();y.setRenderTarget(te),y.getClearColor(X),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),We&&Re.render(B);let ye=y.toneMapping;y.toneMapping=Gn;let Ie=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),d.setupLightsView(z),Q===!0&&ee.setGlobalState(y.clippingPlanes,z),sa(w,B,z),E.updateMultisampleRenderTarget(te),E.updateRenderTargetMipmap(te),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let ve=0,$e=D.length;ve<$e;ve++){let rt=D[ve],lt=rt.object,ti=rt.geometry,Ke=rt.material,Me=rt.group;if(Ke.side===mn&&lt.layers.test(z.layers)){let an=Ke.side;Ke.side=Zt,Ke.needsUpdate=!0,im(lt,B,z,ti,Ke,Me),Ke.side=an,Ke.needsUpdate=!0,Le=!0}}Le===!0&&(E.updateMultisampleRenderTarget(te),E.updateRenderTargetMipmap(te))}y.setRenderTarget(xe),y.setClearColor(X,J),Ie!==void 0&&(z.viewport=Ie),y.toneMapping=ye}function sa(w,D,B){let z=D.isScene===!0?D.overrideMaterial:null;for(let L=0,te=w.length;L<te;L++){let ue=w[L],xe=ue.object,ye=ue.geometry,Ie=z===null?ue.material:z,Le=ue.group;xe.layers.test(B.layers)&&im(xe,D,B,ye,Ie,Le)}}function im(w,D,B,z,L,te){w.onBeforeRender(y,D,B,z,L,te),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),L.onBeforeRender(y,D,B,z,w,te),L.transparent===!0&&L.side===mn&&L.forceSinglePass===!1?(L.side=Zt,L.needsUpdate=!0,y.renderBufferDirect(B,D,z,L,w,te),L.side=Wn,L.needsUpdate=!0,y.renderBufferDirect(B,D,z,L,w,te),L.side=mn):y.renderBufferDirect(B,D,z,L,w,te),w.onAfterRender(y,D,B,z,L,te)}function ra(w,D,B){D.isScene!==!0&&(D=gt);let z=Te.get(w),L=d.state.lights,te=d.state.shadowsArray,ue=L.state.version,xe=be.getParameters(w,L.state,te,D,B),ye=be.getProgramCacheKey(xe),Ie=z.programs;z.environment=w.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(w.isMeshStandardMaterial?F:b).get(w.envMap||z.environment),z.envMapRotation=z.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,Ie===void 0&&(w.addEventListener("dispose",De),Ie=new Map,z.programs=Ie);let Le=Ie.get(ye);if(Le!==void 0){if(z.currentProgram===Le&&z.lightsStateVersion===ue)return sm(w,xe),Le}else xe.uniforms=be.getUniforms(w),w.onBeforeCompile(xe,y),Le=be.acquireProgram(xe,ye),Ie.set(ye,Le),z.uniforms=xe.uniforms;let ve=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ve.clippingPlanes=ee.uniform),sm(w,xe),z.needsLights=A0(w),z.lightsStateVersion=ue,z.needsLights&&(ve.ambientLightColor.value=L.state.ambient,ve.lightProbe.value=L.state.probe,ve.directionalLights.value=L.state.directional,ve.directionalLightShadows.value=L.state.directionalShadow,ve.spotLights.value=L.state.spot,ve.spotLightShadows.value=L.state.spotShadow,ve.rectAreaLights.value=L.state.rectArea,ve.ltc_1.value=L.state.rectAreaLTC1,ve.ltc_2.value=L.state.rectAreaLTC2,ve.pointLights.value=L.state.point,ve.pointLightShadows.value=L.state.pointShadow,ve.hemisphereLights.value=L.state.hemi,ve.directionalShadowMap.value=L.state.directionalShadowMap,ve.directionalShadowMatrix.value=L.state.directionalShadowMatrix,ve.spotShadowMap.value=L.state.spotShadowMap,ve.spotLightMatrix.value=L.state.spotLightMatrix,ve.spotLightMap.value=L.state.spotLightMap,ve.pointShadowMap.value=L.state.pointShadowMap,ve.pointShadowMatrix.value=L.state.pointShadowMatrix),z.currentProgram=Le,z.uniformsList=null,Le}function nm(w){if(w.uniformsList===null){let D=w.currentProgram.getUniforms();w.uniformsList=dr.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function sm(w,D){let B=Te.get(w);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function T0(w,D,B,z,L){D.isScene!==!0&&(D=gt),E.resetTextureUnits();let te=D.fog,ue=z.isMeshStandardMaterial?D.environment:null,xe=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:br,ye=(z.isMeshStandardMaterial?F:b).get(z.envMap||ue),Ie=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Le=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),ve=!!B.morphAttributes.position,$e=!!B.morphAttributes.normal,rt=!!B.morphAttributes.color,lt=Gn;z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(lt=y.toneMapping);let ti=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ke=ti!==void 0?ti.length:0,Me=Te.get(z),an=d.state.lights;if(Q===!0&&(ge===!0||w!==_)){let xi=w===_&&z.id===S;ee.setState(z,w,xi)}let Je=!1;z.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==an.state.version||Me.outputColorSpace!==xe||L.isBatchedMesh&&Me.batching===!1||!L.isBatchedMesh&&Me.batching===!0||L.isBatchedMesh&&Me.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Me.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Me.instancing===!1||!L.isInstancedMesh&&Me.instancing===!0||L.isSkinnedMesh&&Me.skinning===!1||!L.isSkinnedMesh&&Me.skinning===!0||L.isInstancedMesh&&Me.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Me.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Me.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Me.instancingMorph===!1&&L.morphTexture!==null||Me.envMap!==ye||z.fog===!0&&Me.fog!==te||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ee.numPlanes||Me.numIntersection!==ee.numIntersection)||Me.vertexAlphas!==Ie||Me.vertexTangents!==Le||Me.morphTargets!==ve||Me.morphNormals!==$e||Me.morphColors!==rt||Me.toneMapping!==lt||Me.morphTargetsCount!==Ke)&&(Je=!0):(Je=!0,Me.__version=z.version);let Ii=Me.currentProgram;Je===!0&&(Ii=ra(z,D,L));let qs=!1,li=!1,go=!1,ct=Ii.getUniforms(),Wi=Me.uniforms;if(Ee.useProgram(Ii.program)&&(qs=!0,li=!0,go=!0),z.id!==S&&(S=z.id,li=!0),qs||_!==w){Ee.buffers.depth.getReversed()?(ne.copy(w.projectionMatrix),Ub(ne),Nb(ne),ct.setValue(O,"projectionMatrix",ne)):ct.setValue(O,"projectionMatrix",w.projectionMatrix),ct.setValue(O,"viewMatrix",w.matrixWorldInverse);let Dn=ct.map.cameraPosition;Dn!==void 0&&Dn.setValue(O,Ce.setFromMatrixPosition(w.matrixWorld)),He.logarithmicDepthBuffer&&ct.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ct.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),_!==w&&(_=w,li=!0,go=!0)}if(L.isSkinnedMesh){ct.setOptional(O,L,"bindMatrix"),ct.setOptional(O,L,"bindMatrixInverse");let xi=L.skeleton;xi&&(xi.boneTexture===null&&xi.computeBoneTexture(),ct.setValue(O,"boneTexture",xi.boneTexture,E))}L.isBatchedMesh&&(ct.setOptional(O,L,"batchingTexture"),ct.setValue(O,"batchingTexture",L._matricesTexture,E),ct.setOptional(O,L,"batchingIdTexture"),ct.setValue(O,"batchingIdTexture",L._indirectTexture,E),ct.setOptional(O,L,"batchingColorTexture"),L._colorsTexture!==null&&ct.setValue(O,"batchingColorTexture",L._colorsTexture,E));let xo=B.morphAttributes;if((xo.position!==void 0||xo.normal!==void 0||xo.color!==void 0)&&Pe.update(L,B,Ii),(li||Me.receiveShadow!==L.receiveShadow)&&(Me.receiveShadow=L.receiveShadow,ct.setValue(O,"receiveShadow",L.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Wi.envMap.value=ye,Wi.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(Wi.envMapIntensity.value=D.environmentIntensity),li&&(ct.setValue(O,"toneMappingExposure",y.toneMappingExposure),Me.needsLights&&E0(Wi,go),te&&z.fog===!0&&le.refreshFogUniforms(Wi,te),le.refreshMaterialUniforms(Wi,z,V,j,d.state.transmissionRenderTarget[w.id]),dr.upload(O,nm(Me),Wi,E)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(dr.upload(O,nm(Me),Wi,E),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ct.setValue(O,"center",L.center),ct.setValue(O,"modelViewMatrix",L.modelViewMatrix),ct.setValue(O,"normalMatrix",L.normalMatrix),ct.setValue(O,"modelMatrix",L.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let xi=z.uniformsGroups;for(let Dn=0,Ln=xi.length;Dn<Ln;Dn++){let rm=xi[Dn];I.update(rm,Ii),I.bind(rm,Ii)}}return Ii}function E0(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function A0(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,D,B){Te.get(w.texture).__webglTexture=D,Te.get(w.depthTexture).__webglTexture=B;let z=Te.get(w);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,D){let B=Te.get(w);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,B=0){C=w,T=D,R=B;let z=!0,L=null,te=!1,ue=!1;if(w){let ye=Te.get(w);if(ye.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(O.FRAMEBUFFER,null),z=!1;else if(ye.__webglFramebuffer===void 0)E.setupRenderTarget(w);else if(ye.__hasExternalTextures)E.rebindTextures(w,Te.get(w.texture).__webglTexture,Te.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let ve=w.depthTexture;if(ye.__boundDepthTexture!==ve){if(ve!==null&&Te.has(ve)&&(w.width!==ve.image.width||w.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(w)}}let Ie=w.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(ue=!0);let Le=Te.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Le[D])?L=Le[D][B]:L=Le[D],te=!0):w.samples>0&&E.useMultisampledRTT(w)===!1?L=Te.get(w).__webglMultisampledFramebuffer:Array.isArray(Le)?L=Le[B]:L=Le,P.copy(w.viewport),H.copy(w.scissor),k=w.scissorTest}else P.copy(_e).multiplyScalar(V).floor(),H.copy(Ne).multiplyScalar(V).floor(),k=Ze;if(Ee.bindFramebuffer(O.FRAMEBUFFER,L)&&z&&Ee.drawBuffers(w,L),Ee.viewport(P),Ee.scissor(H),Ee.setScissorTest(k),te){let ye=Te.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,ye.__webglTexture,B)}else if(ue){let ye=Te.get(w.texture),Ie=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,ye.__webglTexture,B||0,Ie)}S=-1},this.readRenderTargetPixels=function(w,D,B,z,L,te,ue){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Te.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ue!==void 0&&(xe=xe[ue]),xe){Ee.bindFramebuffer(O.FRAMEBUFFER,xe);try{let ye=w.texture,Ie=ye.format,Le=ye.type;if(!He.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-z&&B>=0&&B<=w.height-L&&O.readPixels(D,B,z,L,Fe.convert(Ie),Fe.convert(Le),te)}finally{let ye=C!==null?Te.get(C).__webglFramebuffer:null;Ee.bindFramebuffer(O.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(w,D,B,z,L,te,ue){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Te.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ue!==void 0&&(xe=xe[ue]),xe){let ye=w.texture,Ie=ye.format,Le=ye.type;if(!He.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=w.width-z&&B>=0&&B<=w.height-L){Ee.bindFramebuffer(O.FRAMEBUFFER,xe);let ve=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ve),O.bufferData(O.PIXEL_PACK_BUFFER,te.byteLength,O.STREAM_READ),O.readPixels(D,B,z,L,Fe.convert(Ie),Fe.convert(Le),0);let $e=C!==null?Te.get(C).__webglFramebuffer:null;Ee.bindFramebuffer(O.FRAMEBUFFER,$e);let rt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ob(O,rt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ve),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,te),O.deleteBuffer(ve),O.deleteSync(rt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,D=null,B=0){w.isTexture!==!0&&(So("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,w=arguments[1]);let z=Math.pow(2,-B),L=Math.floor(w.image.width*z),te=Math.floor(w.image.height*z),ue=D!==null?D.x:0,xe=D!==null?D.y:0;E.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,ue,xe,L,te),Ee.unbindTexture()},this.copyTextureToTexture=function(w,D,B=null,z=null,L=0){w.isTexture!==!0&&(So("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,w=arguments[1],D=arguments[2],L=arguments[3]||0,B=null);let te,ue,xe,ye,Ie,Le,ve,$e,rt,lt=w.isCompressedTexture?w.mipmaps[L]:w.image;B!==null?(te=B.max.x-B.min.x,ue=B.max.y-B.min.y,xe=B.isBox3?B.max.z-B.min.z:1,ye=B.min.x,Ie=B.min.y,Le=B.isBox3?B.min.z:0):(te=lt.width,ue=lt.height,xe=lt.depth||1,ye=0,Ie=0,Le=0),z!==null?(ve=z.x,$e=z.y,rt=z.z):(ve=0,$e=0,rt=0);let ti=Fe.convert(D.format),Ke=Fe.convert(D.type),Me;D.isData3DTexture?(E.setTexture3D(D,0),Me=O.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(E.setTexture2DArray(D,0),Me=O.TEXTURE_2D_ARRAY):(E.setTexture2D(D,0),Me=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,D.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,D.unpackAlignment);let an=O.getParameter(O.UNPACK_ROW_LENGTH),Je=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ii=O.getParameter(O.UNPACK_SKIP_PIXELS),qs=O.getParameter(O.UNPACK_SKIP_ROWS),li=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,lt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,lt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ye),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ie),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Le);let go=w.isDataArrayTexture||w.isData3DTexture,ct=D.isDataArrayTexture||D.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let Wi=Te.get(w),xo=Te.get(D),xi=Te.get(Wi.__renderTarget),Dn=Te.get(xo.__renderTarget);Ee.bindFramebuffer(O.READ_FRAMEBUFFER,xi.__webglFramebuffer),Ee.bindFramebuffer(O.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Ln=0;Ln<xe;Ln++)go&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Te.get(w).__webglTexture,L,Le+Ln),w.isDepthTexture?(ct&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Te.get(D).__webglTexture,L,rt+Ln),O.blitFramebuffer(ye,Ie,te,ue,ve,$e,te,ue,O.DEPTH_BUFFER_BIT,O.NEAREST)):ct?O.copyTexSubImage3D(Me,L,ve,$e,rt+Ln,ye,Ie,te,ue):O.copyTexSubImage2D(Me,L,ve,$e,rt+Ln,ye,Ie,te,ue);Ee.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ct?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Me,L,ve,$e,rt,te,ue,xe,ti,Ke,lt.data):D.isCompressedArrayTexture?O.compressedTexSubImage3D(Me,L,ve,$e,rt,te,ue,xe,ti,lt.data):O.texSubImage3D(Me,L,ve,$e,rt,te,ue,xe,ti,Ke,lt):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,L,ve,$e,te,ue,ti,Ke,lt.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,L,ve,$e,lt.width,lt.height,ti,lt.data):O.texSubImage2D(O.TEXTURE_2D,L,ve,$e,te,ue,ti,Ke,lt);O.pixelStorei(O.UNPACK_ROW_LENGTH,an),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Je),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ii),O.pixelStorei(O.UNPACK_SKIP_ROWS,qs),O.pixelStorei(O.UNPACK_SKIP_IMAGES,li),L===0&&D.generateMipmaps&&O.generateMipmap(Me),Ee.unbindTexture()},this.copyTextureToTexture3D=function(w,D,B=null,z=null,L=0){return w.isTexture!==!0&&(So("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,w=arguments[2],D=arguments[3],L=arguments[4]||0),So('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,D,B,z,L)},this.initRenderTarget=function(w){Te.get(w).__webglFramebuffer===void 0&&E.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?E.setTextureCube(w,0):w.isData3DTexture?E.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?E.setTexture2DArray(w,0):E.setTexture2D(w,0),Ee.unbindTexture()},this.resetState=function(){T=0,R=0,C=null,Ee.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var wd=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var el=class extends Yn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},tl=new U,il=new U,og=new Et,Mo=new Ro,Aa=new Cs,xf=new U,ag=new U,nl=class extends fi{constructor(e=new di,t=new el){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)tl.fromBufferAttribute(t,s-1),il.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=tl.distanceTo(il);e.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(s),Aa.radius+=r,e.ray.intersectsSphere(Aa)===!1)return;og.copy(s).invert(),Mo.copy(e.ray).applyMatrix4(og);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let d=u.getX(x),v=u.getX(x+1),M=Ca(this,e,Mo,l,d,v);M&&t.push(M)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(p),d=Ca(this,e,Mo,l,x,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){let d=Ca(this,e,Mo,l,x,x+1);d&&t.push(d)}if(this.isLineLoop){let x=Ca(this,e,Mo,l,g-1,p);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ca(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(tl.fromBufferAttribute(o,s),il.fromBufferAttribute(o,r),t.distanceSqToSegment(tl,il,xf,ag)>n)return;xf.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(xf);if(!(l<e.near||l>e.far))return{distance:l,point:ag.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var lg=new U,cg=new U,Td=class extends nl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)lg.fromBufferAttribute(t,s),cg.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+lg.distanceTo(cg);e.setAttribute("lineDistance",new Ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ed=class extends nl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},sl=class extends Yn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ug=new Et,Ad=new Ro,Ra=new Cs,Pa=new U,Cd=class extends fi{constructor(e=new di,t=new sl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ra.copy(n.boundingSphere),Ra.applyMatrix4(s),Ra.radius+=r,e.ray.intersectsSphere(Ra)===!1)return;ug.copy(s).invert(),Ad.copy(e.ray).applyMatrix4(ug);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,x=p;g<x;g++){let m=c.getX(g);Pa.fromBufferAttribute(h,m),hg(Pa,m,l,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,x=p;g<x;g++)Pa.fromBufferAttribute(h,g),hg(Pa,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function hg(i,e,t,n,s,r,o){let a=Ad.distanceSqToPoint(i);if(a<t){let l=new U;Ad.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Rd=class i extends di{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new Ft(r,3)),this.setAttribute("normal",new Ft(r.slice(),3)),this.setAttribute("uv",new Ft(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let M=new U,y=new U,A=new U;for(let T=0;T<t.length;T+=3)p(t[T+0],M),p(t[T+1],y),p(t[T+2],A),l(M,y,A,v)}function l(v,M,y,A){let T=A+1,R=[];for(let C=0;C<=T;C++){R[C]=[];let S=v.clone().lerp(y,C/T),_=M.clone().lerp(y,C/T),P=T-C;for(let H=0;H<=P;H++)H===0&&C===T?R[C][H]=S:R[C][H]=S.clone().lerp(_,H/P)}for(let C=0;C<T;C++)for(let S=0;S<2*(T-C)-1;S++){let _=Math.floor(S/2);S%2===0?(f(R[C][_+1]),f(R[C+1][_]),f(R[C][_])):(f(R[C][_+1]),f(R[C+1][_+1]),f(R[C+1][_]))}}function c(v){let M=new U;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(v),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function u(){let v=new U;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let y=m(v)/2/Math.PI+.5,A=d(v)/Math.PI+.5;o.push(y,1-A)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){let M=o[v+0],y=o[v+2],A=o[v+4],T=Math.max(M,y,A),R=Math.min(M,y,A);T>.9&&R<.1&&(M<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),A<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function p(v,M){let y=v*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function g(){let v=new U,M=new U,y=new U,A=new U,T=new je,R=new je,C=new je;for(let S=0,_=0;S<r.length;S+=9,_+=6){v.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),T.set(o[_+0],o[_+1]),R.set(o[_+2],o[_+3]),C.set(o[_+4],o[_+5]),A.copy(v).add(M).add(y).divideScalar(3);let P=m(A);x(T,_+0,v,P),x(R,_+2,M,P),x(C,_+4,y,P)}}function x(v,M,y,A){A<0&&v.x===1&&(o[M]=v.x-1),y.x===0&&y.z===0&&(o[M]=A/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Ia=new U,Da=new U,yf=new U,La=new Vn,Pd=class extends di{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(hr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:d}=La;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),La.getNormal(yf),h[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){let M=(v+1)%3,y=h[v],A=h[M],T=La[u[v]],R=La[u[M]],C=`${y}_${A}`,S=`${A}_${y}`;S in f&&f[S]?(yf.dot(f[S].normal)<=r&&(p.push(T.x,T.y,T.z),p.push(R.x,R.y,R.z)),f[S]=null):C in f||(f[C]={index0:c[v],index1:c[M],normal:yf.clone()})}}for(let g in f)if(f[g]){let{index0:x,index1:m}=f[g];Ia.fromBufferAttribute(a,x),Da.fromBufferAttribute(a,m),p.push(Ia.x,Ia.y,Ia.z),p.push(Da.x,Da.y,Da.z)}this.setAttribute("position",new Ft(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Id=class i extends Rd{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Dd=class i extends di{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new U,f=new U,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let v=[],M=d/n,y=0;d===0&&o===0?y=.5/t:d===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){let T=A/t;h.x=-e*Math.cos(s+T*r)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(s+T*r)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(T+y,1-M),v.push(c++)}u.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let M=u[d][v+1],y=u[d][v],A=u[d+1][v],T=u[d+1][v+1];(d!==0||o>0)&&p.push(M,y,T),(d!==n-1||l<Math.PI)&&p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(x,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Oa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function PE(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var _r=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];i:{e:{let o;t:{n:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break n;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break i}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ld=class extends _r{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cm,endingEnd:cm}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case um:r=e,a=2*t-n;break;case hm:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case um:o=e,l=2*n-t;break;case hm:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,d=-f*m+2*f*x-f*g,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,M=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let A=0;A!==a;++A)r[A]=d*o[u+A]+v*o[c+A]+M*o[l+A]+y*o[h+A];return r}},Od=class extends _r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[c+f]*h+o[l+f]*u;return r}},Ud=class extends _r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Bi=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Oa(t,this.TimeBufferType),this.values=Oa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oa(e.times,Array),values:Oa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ud(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Od(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ld(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ka:t=this.InterpolantFactoryMethodDiscrete;break;case rd:t=this.InterpolantFactoryMethodLinear;break;case Gh:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ka;case this.InterpolantFactoryMethodLinear:return rd;case this.InterpolantFactoryMethodSmooth:return Gh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&PE(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Gh,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let h=a*n,f=h-n,p=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[f+g]||x!==t[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[h+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Bi.prototype.TimeBufferType=Float32Array;Bi.prototype.ValueBufferType=Float32Array;Bi.prototype.DefaultInterpolation=rd;var Rs=class extends Bi{constructor(e,t,n){super(e,t,n)}};Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=ka;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var Nd=class extends Bi{};Nd.prototype.ValueTypeName="color";var Fd=class extends Bi{};Fd.prototype.ValueTypeName="number";var Bd=class extends _r{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)qn.slerpFlat(r,0,o,c-a,o,c,l);return r}},rl=class extends Bi{InterpolantFactoryMethodLinear(e){return new Bd(this.times,this.values,this.getValueSize(),e)}};rl.prototype.ValueTypeName="quaternion";rl.prototype.InterpolantFactoryMethodSmooth=void 0;var Ps=class extends Bi{constructor(e,t,n){super(e,t,n)}};Ps.prototype.ValueTypeName="string";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=ka;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;var zd=class extends Bi{};zd.prototype.ValueTypeName="vector";var kd=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){let p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},IE=new kd,Vd=class{constructor(e){this.manager=e!==void 0?e:IE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Vd.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jd="\\[\\]\\.:\\/",DE=new RegExp("["+Jd+"]","g"),jd="[^"+Jd+"]",LE="[^"+Jd.replace("\\.","")+"]",OE=/((?:WC+[\/:])*)/.source.replace("WC",jd),UE=/(WCOD+)?/.source.replace("WCOD",LE),NE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jd),FE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jd),BE=new RegExp("^"+OE+UE+NE+FE+"$"),zE=["material","materials","bones","map"],Hd=class{constructor(e,t,n){let s=n||dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},dt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(DE,"")}static parseTrackName(e){let t=BE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);zE.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};dt.Composite=Hd;dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};dt.prototype.GetterByBindingType=[dt.prototype._getValue_direct,dt.prototype._getValue_array,dt.prototype._getValue_arrayElement,dt.prototype._getValue_toArray];dt.prototype.SetterByBindingTypeAndVersioning=[[dt.prototype._setValue_direct,dt.prototype._setValue_direct_setNeedsUpdate,dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_array,dt.prototype._setValue_array_setNeedsUpdate,dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_arrayElement,dt.prototype._setValue_arrayElement_setNeedsUpdate,dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_fromArray,dt.prototype._setValue_fromArray_setNeedsUpdate,dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var VR=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Gt=i=>i;var $n=Gt,zi=Gt;function Og(i,e){i.indexOf(e)===-1&&i.push(e)}function cl(i,e){let t=i.indexOf(e);t>-1&&i.splice(t,1)}var wr=class{constructor(){this.subscriptions=[]}add(e){return Og(this.subscriptions,e),()=>cl(this.subscriptions,e)}notify(e,t,n){let s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,t,n);else for(let r=0;r<s;r++){let o=this.subscriptions[r];o&&o(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}};function Tr(i,e){return e?i*(1e3/e):0}var Er={skipAnimations:!1,useManualTiming:!1};function Ug(i){let e=new Set,t=new Set,n=!1,s=!1,r=new WeakSet,o={delta:0,timestamp:0,isProcessing:!1};function a(c){r.has(c)&&(l.schedule(c),i()),c(o)}let l={schedule:(c,u=!1,h=!1)=>{let p=h&&n?e:t;return u&&r.add(c),p.has(c)||p.add(c),c},cancel:c=>{t.delete(c),r.delete(c)},process:c=>{if(o=c,n){s=!0;return}n=!0,[e,t]=[t,e],e.forEach(a),e.clear(),n=!1,s&&(s=!1,l.process(c))}};return l}var ul=["read","resolveKeyframes","update","preRender","render","postRender"],kE=40;function Ng(i,e){let t=!1,n=!0,s={delta:0,timestamp:0,isProcessing:!1},r=()=>t=!0,o=ul.reduce((d,v)=>(d[v]=Ug(r),d),{}),{read:a,resolveKeyframes:l,update:c,preRender:u,render:h,postRender:f}=o,p=()=>{let d=Er.useManualTiming?s.timestamp:performance.now();t=!1,s.delta=n?1e3/60:Math.max(Math.min(d-s.timestamp,kE),1),s.timestamp=d,s.isProcessing=!0,a.process(s),l.process(s),c.process(s),u.process(s),h.process(s),f.process(s),s.isProcessing=!1,t&&e&&(n=!1,i(p))},g=()=>{t=!0,n=!0,s.isProcessing||i(p)};return{schedule:ul.reduce((d,v)=>{let M=o[v];return d[v]=(y,A=!1,T=!1)=>(t||g(),M.schedule(y,A,T)),d},{}),cancel:d=>{for(let v=0;v<ul.length;v++)o[ul[v]].cancel(d)},state:s,steps:o}}var{schedule:bt,cancel:Mn,state:Zn,steps:nP}=Ng(typeof requestAnimationFrame<"u"?requestAnimationFrame:Gt,!0);var hl;function VE(){hl=void 0}var Mi={now:()=>(hl===void 0&&Mi.set(Zn.isProcessing||Er.useManualTiming?Zn.timestamp:performance.now()),hl),set:i=>{hl=i,queueMicrotask(VE)}};var Fg=30,HE=i=>!isNaN(parseFloat(i)),Bg={current:void 0},Qd=class{constructor(e,t={}){this.version="11.15.0",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(n,s=!0)=>{let r=Mi.now();this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(n),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=Mi.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=HE(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new wr);let n=this.events[e].add(t);return e==="change"?()=>{n(),bt.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e,t=!0){!t||!this.passiveEffect?this.updateAndNotify(e,t):this.passiveEffect(e,this.updateAndNotify)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return Bg.current&&Bg.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=Mi.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>Fg)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,Fg);return Tr(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Sn(i,e){return new Qd(i,e)}function Ar(i){let e;return()=>(e===void 0&&(e=i()),e)}var fl=Ar(()=>window.ScrollTimeline!==void 0);var Cr=class{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}then(e,t){return Promise.all(this.animations).then(e).catch(t)}getAll(e){return this.animations[0][e]}setAll(e,t){for(let n=0;n<this.animations.length;n++)this.animations[n][e]=t}attachTimeline(e,t){let n=this.animations.map(s=>fl()&&s.attachTimeline?s.attachTimeline(e):t(s));return()=>{n.forEach((s,r)=>{s&&s(),this.animations[r].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get startTime(){return this.getAll("startTime")}get duration(){let e=0;for(let t=0;t<this.animations.length;t++)e=Math.max(e,this.animations[t].duration);return e}runAll(e){this.animations.forEach(t=>t[e]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}};var Yi=(i,e,t)=>{let n=e-i;return n===0?1:(t-i)/n};var dl=(i,e,t=10)=>{let n="",s=Math.max(Math.round(e/t),2);for(let r=0;r<s;r++)n+=i(Yi(0,s-1,r))+", ";return`linear(${n.substring(0,n.length-2)})`};var Wt=i=>i*1e3,ni=i=>i/1e3;var GE=5;function pl(i,e,t){let n=Math.max(e-GE,0);return Tr(t-i(n),e-n)}var pi=(i,e,t)=>t>e?e:t<i?i:t;var ut={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};var ep=.001;function zg({duration:i=ut.duration,bounce:e=ut.bounce,velocity:t=ut.velocity,mass:n=ut.mass}){let s,r;$n(i<=Wt(ut.maxDuration),"Spring duration must be 10 seconds or less");let o=1-e;o=pi(ut.minDamping,ut.maxDamping,o),i=pi(ut.minDuration,ut.maxDuration,ni(i)),o<1?(s=c=>{let u=c*o,h=u*i,f=u-t,p=ml(c,o),g=Math.exp(-h);return ep-f/p*g},r=c=>{let h=c*o*i,f=h*t+t,p=Math.pow(o,2)*Math.pow(c,2)*i,g=Math.exp(-h),x=ml(Math.pow(c,2),o);return(-s(c)+ep>0?-1:1)*((f-p)*g)/x}):(s=c=>{let u=Math.exp(-c*i),h=(c-t)*i+1;return-ep+u*h},r=c=>{let u=Math.exp(-c*i),h=(t-c)*(i*i);return u*h});let a=5/i,l=XE(s,r,a);if(i=Wt(i),isNaN(l))return{stiffness:ut.stiffness,damping:ut.damping,duration:i};{let c=Math.pow(l,2)*n;return{stiffness:c,damping:o*2*Math.sqrt(n*c),duration:i}}}var WE=12;function XE(i,e,t){let n=t;for(let s=1;s<WE;s++)n=n-i(n)/e(n);return n}function ml(i,e){return i*Math.sqrt(1-e*e)}function Rr(i){let e=0,t=50,n=i.next(e);for(;!n.done&&e<2e4;)e+=t,n=i.next(e);return e>=2e4?1/0:e}var qE=["duration","bounce"],YE=["stiffness","damping","mass"];function kg(i,e){return e.some(t=>i[t]!==void 0)}function $E(i){let e={velocity:ut.velocity,stiffness:ut.stiffness,damping:ut.damping,mass:ut.mass,isResolvedFromDuration:!1,...i};if(!kg(i,YE)&&kg(i,qE))if(i.visualDuration){let t=i.visualDuration,n=2*Math.PI/(t*1.2),s=n*n,r=2*pi(.05,1,1-i.bounce)*Math.sqrt(s);e={...e,mass:ut.mass,stiffness:s,damping:r}}else{let t=zg(i);e={...e,...t,mass:ut.mass},e.isResolvedFromDuration=!0}return e}function Pr(i=ut.visualDuration,e=ut.bounce){let t=typeof i!="object"?{visualDuration:i,keyframes:[0,1],bounce:e}:i,{restSpeed:n,restDelta:s}=t,r=t.keyframes[0],o=t.keyframes[t.keyframes.length-1],a={done:!1,value:r},{stiffness:l,damping:c,mass:u,duration:h,velocity:f,isResolvedFromDuration:p}=$E({...t,velocity:-ni(t.velocity||0)}),g=f||0,x=c/(2*Math.sqrt(l*u)),m=o-r,d=ni(Math.sqrt(l/u)),v=Math.abs(m)<5;n||(n=v?ut.restSpeed.granular:ut.restSpeed.default),s||(s=v?ut.restDelta.granular:ut.restDelta.default);let M;if(x<1){let A=ml(d,x);M=T=>{let R=Math.exp(-x*d*T);return o-R*((g+x*d*m)/A*Math.sin(A*T)+m*Math.cos(A*T))}}else if(x===1)M=A=>o-Math.exp(-d*A)*(m+(g+d*m)*A);else{let A=d*Math.sqrt(x*x-1);M=T=>{let R=Math.exp(-x*d*T),C=Math.min(A*T,300);return o-R*((g+x*d*m)*Math.sinh(C)+A*m*Math.cosh(C))/A}}let y={calculatedDuration:p&&h||null,next:A=>{let T=M(A);if(p)a.done=A>=h;else{let R=0;x<1&&(R=A===0?Wt(g):pl(M,A,T));let C=Math.abs(R)<=n,S=Math.abs(o-T)<=s;a.done=C&&S}return a.value=a.done?o:T,a},toString:()=>{let A=Math.min(Rr(y),2e4),T=dl(R=>y.next(A*R).value,A,30);return A+"ms "+T}};return y}function Vg(i,e=100,t){let n=t({...i,keyframes:[0,e]}),s=Math.min(Rr(n),2e4);return{type:"keyframes",ease:r=>n.next(s*r).value/e,duration:ni(s)}}var $i=(i,e,t)=>i+(e-i)*t;function gl(i,e){let t=i[i.length-1];for(let n=1;n<=e;n++){let s=Yi(0,e,n);i.push($i(t,1,s))}}function Ir(i){let e=[0];return gl(e,i.length-1),e}var pt=i=>!!(i&&i.getVelocity);function Dr(i,e,t){var n;if(i instanceof Element)return[i];if(typeof i=="string"){let s=document;e&&(s=e.current);let r=(n=t?.[i])!==null&&n!==void 0?n:s.querySelectorAll(i);return r?Array.from(r):[]}return Array.from(i)}function Lo(i){return typeof i=="object"&&!Array.isArray(i)}function xl(i,e,t,n){return typeof i=="string"&&Lo(e)?Dr(i,t,n):i instanceof NodeList?Array.from(i):Array.isArray(i)?i:[i]}function Kn(i){return typeof i=="function"}function ip(i,e,t,n){var s;return typeof e=="number"?e:e.startsWith("-")||e.startsWith("+")?Math.max(0,i+parseFloat(e)):e==="<"?t:(s=n.get(e))!==null&&s!==void 0?s:i}var Hg=(i,e,t)=>{let n=e-i;return((t-i)%n+n)%n+i};var yl=i=>Array.isArray(i)&&typeof i[0]!="number";function vl(i,e){return yl(i)?i[Hg(0,i.length,e)]:i}function ZE(i,e,t){for(let n=0;n<i.length;n++){let s=i[n];s.at>e&&s.at<t&&(cl(i,s),n--)}}function Gg(i,e,t,n,s,r){ZE(i,s,r);for(let o=0;o<e.length;o++)i.push({value:e[o],at:$i(s,r,n[o]),easing:vl(t,o)})}function Wg(i,e){return i.at===e.at?i.value===null?1:e.value===null?-1:0:i.at-e.at}function Xg(i,e){for(let t=0;t<i.length;t++)i[t]=i[t]/(e+1)}function qg(i,e,t){return i*(e+1)}var KE="easeInOut",JE=20;function Zg(i,{defaultTransition:e={},...t}={},n,s){let r=e.duration||.3,o=new Map,a=new Map,l={},c=new Map,u=0,h=0,f=0;for(let p=0;p<i.length;p++){let g=i[p];if(typeof g=="string"){c.set(g,h);continue}else if(!Array.isArray(g)){c.set(g.name,ip(h,g.at,u,c));continue}let[x,m,d={}]=g;d.at!==void 0&&(h=ip(h,d.at,u,c));let v=0,M=(y,A,T,R=0,C=0)=>{let S=jE(y),{delay:_=0,times:P=Ir(S),type:H="keyframes",repeat:k,repeatType:X,repeatDelay:J=0,...W}=A,{ease:j=e.ease||"easeOut",duration:V}=A,re=typeof _=="function"?_(R,C):_,fe=S.length,_e=Kn(H)?H:s?.[H];if(fe<=2&&_e){let Q=100;if(fe===2&&tA(S)){let we=S[1]-S[0];Q=Math.abs(we)}let ge={...W};V!==void 0&&(ge.duration=Wt(V));let ne=Vg(ge,Q,_e);j=ne.ease,V=ne.duration}V??(V=r);let Ne=h+re;P.length===1&&P[0]===0&&(P[1]=1);let Ze=P.length-S.length;if(Ze>0&&gl(P,Ze),S.length===1&&S.unshift(null),k){zi(k<JE,"Repeat count too high, must be less than 20"),V=qg(V,k);let Q=[...S],ge=[...P];j=Array.isArray(j)?[...j]:[j];let ne=[...j];for(let we=0;we<k;we++){S.push(...Q);for(let Ce=0;Ce<Q.length;Ce++)P.push(ge[Ce]+(we+1)),j.push(Ce===0?"linear":vl(ne,Ce-1))}Xg(P,k)}let q=Ne+V;Gg(T,S,j,P,Ne,q),v=Math.max(re+V,v),f=Math.max(q,f)};if(pt(x)){let y=Yg(x,a);M(m,d,$g("default",y))}else{let y=xl(x,m,n,l),A=y.length;for(let T=0;T<A;T++){m=m,d=d;let R=y[T],C=Yg(R,a);for(let S in m)M(m[S],QE(d,S),$g(S,C),T,A)}}u=h,h+=v}return a.forEach((p,g)=>{for(let x in p){let m=p[x];m.sort(Wg);let d=[],v=[],M=[];for(let A=0;A<m.length;A++){let{at:T,value:R,easing:C}=m[A];d.push(R),v.push(Yi(0,f,T)),M.push(C||"easeOut")}v[0]!==0&&(v.unshift(0),d.unshift(d[0]),M.unshift(KE)),v[v.length-1]!==1&&(v.push(1),d.push(null)),o.has(g)||o.set(g,{keyframes:{},transition:{}});let y=o.get(g);y.keyframes[x]=d,y.transition[x]={...e,duration:f,ease:M,times:v,...t}}}),o}function Yg(i,e){return!e.has(i)&&e.set(i,{}),e.get(i)}function $g(i,e){return e[i]||(e[i]=[]),e[i]}function jE(i){return Array.isArray(i)?i:[i]}function QE(i,e){return i&&i[e]?{...i,...i[e]}:{...i}}var eA=i=>typeof i=="number",tA=i=>i.every(eA);var wn=new WeakMap;var Jn=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],si=new Set(Jn);var iA={type:"spring",stiffness:500,damping:25,restSpeed:10},nA=i=>({type:"spring",stiffness:550,damping:i===0?2*Math.sqrt(550):30,restSpeed:10}),sA={type:"keyframes",duration:.8},rA={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Kg=(i,{keyframes:e})=>e.length>2?sA:si.has(i)?i.startsWith("scale")?nA(e[1]):iA:rA;function _l(i,e){return i?i[e]||i.default||i:void 0}var bl={current:!1};var oA=i=>i!==null;function jn(i,{repeat:e,repeatType:t="loop"},n){let s=i.filter(oA),r=e&&t!=="loop"&&e%2===1?0:s.length-1;return!r||n===void 0?s[r]:n}var Jg=(i,e,t)=>(((1-3*t+3*e)*i+(3*t-6*e))*i+3*e)*i,aA=1e-7,lA=12;function cA(i,e,t,n,s){let r,o,a=0;do o=e+(t-e)/2,r=Jg(o,n,s)-i,r>0?t=o:e=o;while(Math.abs(r)>aA&&++a<lA);return o}function Qn(i,e,t,n){if(i===e&&t===n)return Gt;let s=r=>cA(r,0,1,i,t);return r=>r===0||r===1?r:Jg(s(r),e,n)}var Ml=i=>e=>e<=.5?i(2*e)/2:(2-i(2*(1-e)))/2;var Sl=i=>e=>1-i(1-e);var np=Qn(.33,1.53,.69,.99),Oo=Sl(np),wl=Ml(Oo);var Tl=i=>(i*=2)<1?.5*Oo(i):.5*(2-Math.pow(2,-10*(i-1)));var El=i=>1-Math.sin(Math.acos(i)),jg=Sl(El),Al=Ml(El);var Cl=i=>/^0[^.\s]+$/u.test(i);function Qg(i){return typeof i=="number"?i===0:i!==null?i==="none"||i==="0"||Cl(i):!0}var Rl=i=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(i);var ex=i=>e=>typeof e=="string"&&e.startsWith(i),Pl=ex("--"),uA=ex("var(--"),Lr=i=>uA(i)?hA.test(i.split("/*")[0].trim()):!1,hA=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;var fA=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function dA(i){let e=fA.exec(i);if(!e)return[,];let[,t,n,s]=e;return[`--${t??n}`,s]}var pA=4;function sp(i,e,t=1){zi(t<=pA,`Max CSS variable fallback depth detected in property "${i}". This may indicate a circular fallback dependency.`);let[n,s]=dA(i);if(!n)return;let r=window.getComputedStyle(e).getPropertyValue(n);if(r){let o=r.trim();return Rl(o)?parseFloat(o):o}return Lr(s)?sp(s,e,t+1):s}var Zi={test:i=>typeof i=="number",parse:parseFloat,transform:i=>i},Tn={...Zi,transform:i=>pi(0,1,i)},Uo={...Zi,default:1};var No=i=>({test:e=>typeof e=="string"&&e.endsWith(i)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${i}`}),Ki=No("deg"),es=No("%"),Se=No("px"),tx=No("vh"),ix=No("vw"),rp={...es,parse:i=>es.parse(i)/100,transform:i=>es.transform(i*100)};var rx=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),op=i=>i===Zi||i===Se,nx=(i,e)=>parseFloat(i.split(", ")[e]),sx=(i,e)=>(t,{transform:n})=>{if(n==="none"||!n)return 0;let s=n.match(/^matrix3d\((.+)\)$/u);if(s)return nx(s[1],e);{let r=n.match(/^matrix\((.+)\)$/u);return r?nx(r[1],i):0}},mA=new Set(["x","y","z"]),gA=Jn.filter(i=>!mA.has(i));function ox(i){let e=[];return gA.forEach(t=>{let n=i.getValue(t);n!==void 0&&(e.push([t,n.get()]),n.set(t.startsWith("scale")?1:0))}),e}var Is={width:({x:i},{paddingLeft:e="0",paddingRight:t="0"})=>i.max-i.min-parseFloat(e)-parseFloat(t),height:({y:i},{paddingTop:e="0",paddingBottom:t="0"})=>i.max-i.min-parseFloat(e)-parseFloat(t),top:(i,{top:e})=>parseFloat(e),left:(i,{left:e})=>parseFloat(e),bottom:({y:i},{top:e})=>parseFloat(e)+(i.max-i.min),right:({x:i},{left:e})=>parseFloat(e)+(i.max-i.min),x:sx(4,13),y:sx(5,14)};Is.translateX=Is.x;Is.translateY=Is.y;var Il=i=>e=>e.test(i);var ax={test:i=>i==="auto",parse:i=>i};var ap=[Zi,Se,es,Ki,ix,tx,ax],lp=i=>ap.find(Il(i));var Ds=new Set,cp=!1,up=!1;function lx(){if(up){let i=Array.from(Ds).filter(n=>n.needsMeasurement),e=new Set(i.map(n=>n.element)),t=new Map;e.forEach(n=>{let s=ox(n);s.length&&(t.set(n,s),n.render())}),i.forEach(n=>n.measureInitialState()),e.forEach(n=>{n.render();let s=t.get(n);s&&s.forEach(([r,o])=>{var a;(a=n.getValue(r))===null||a===void 0||a.set(o)})}),i.forEach(n=>n.measureEndState()),i.forEach(n=>{n.suspendedScrollY!==void 0&&window.scrollTo(0,n.suspendedScrollY)})}up=!1,cp=!1,Ds.forEach(i=>i.complete()),Ds.clear()}function cx(){Ds.forEach(i=>{i.readKeyframes(),i.needsMeasurement&&(up=!0)})}function ux(){cx(),lx()}var ts=class{constructor(e,t,n,s,r,o=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=s,this.element=r,this.isAsync=o}scheduleResolve(){this.isScheduled=!0,this.isAsync?(Ds.add(this),cp||(cp=!0,bt.read(cx),bt.resolveKeyframes(lx))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:s}=this;for(let r=0;r<e.length;r++)if(e[r]===null)if(r===0){let o=s?.get(),a=e[e.length-1];if(o!==void 0)e[0]=o;else if(n&&t){let l=n.readValue(t,a);l!=null&&(e[0]=l)}e[0]===void 0&&(e[0]=a),s&&o===void 0&&s.set(e[0])}else e[r]=e[r-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),Ds.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,Ds.delete(this))}resume(){this.isComplete||this.scheduleResolve()}};var is=i=>Math.round(i*1e5)/1e5;var Or=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function hx(i){return i==null}var fx=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;var Ur=(i,e)=>t=>!!(typeof t=="string"&&fx.test(t)&&t.startsWith(i)||e&&!hx(t)&&Object.prototype.hasOwnProperty.call(t,e)),Dl=(i,e,t)=>n=>{if(typeof n!="string")return n;let[s,r,o,a]=n.match(Or);return{[i]:parseFloat(s),[e]:parseFloat(r),[t]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}};var xA=i=>pi(0,255,i),hp={...Zi,transform:i=>Math.round(xA(i))},Ji={test:Ur("rgb","red"),parse:Dl("red","green","blue"),transform:({red:i,green:e,blue:t,alpha:n=1})=>"rgba("+hp.transform(i)+", "+hp.transform(e)+", "+hp.transform(t)+", "+is(Tn.transform(n))+")"};function yA(i){let e="",t="",n="",s="";return i.length>5?(e=i.substring(1,3),t=i.substring(3,5),n=i.substring(5,7),s=i.substring(7,9)):(e=i.substring(1,2),t=i.substring(2,3),n=i.substring(3,4),s=i.substring(4,5),e+=e,t+=t,n+=n,s+=s),{red:parseInt(e,16),green:parseInt(t,16),blue:parseInt(n,16),alpha:s?parseInt(s,16)/255:1}}var Fo={test:Ur("#"),parse:yA,transform:Ji.transform};var ns={test:Ur("hsl","hue"),parse:Dl("hue","saturation","lightness"),transform:({hue:i,saturation:e,lightness:t,alpha:n=1})=>"hsla("+Math.round(i)+", "+es.transform(is(e))+", "+es.transform(is(t))+", "+is(Tn.transform(n))+")"};var Pt={test:i=>Ji.test(i)||Fo.test(i)||ns.test(i),parse:i=>Ji.test(i)?Ji.parse(i):ns.test(i)?ns.parse(i):Fo.parse(i),transform:i=>typeof i=="string"?i:i.hasOwnProperty("red")?Ji.transform(i):ns.transform(i)};var dx=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function vA(i){var e,t;return isNaN(i)&&typeof i=="string"&&(((e=i.match(Or))===null||e===void 0?void 0:e.length)||0)+(((t=i.match(dx))===null||t===void 0?void 0:t.length)||0)>0}var mx="number",gx="color",_A="var",bA="var(",px="${}",MA=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ls(i){let e=i.toString(),t=[],n={color:[],number:[],var:[]},s=[],r=0,a=e.replace(MA,l=>(Pt.test(l)?(n.color.push(r),s.push(gx),t.push(Pt.parse(l))):l.startsWith(bA)?(n.var.push(r),s.push(_A),t.push(l)):(n.number.push(r),s.push(mx),t.push(parseFloat(l))),++r,px)).split(px);return{values:t,split:a,indexes:n,types:s}}function xx(i){return Ls(i).values}function yx(i){let{split:e,types:t}=Ls(i),n=e.length;return s=>{let r="";for(let o=0;o<n;o++)if(r+=e[o],s[o]!==void 0){let a=t[o];a===mx?r+=is(s[o]):a===gx?r+=Pt.transform(s[o]):r+=s[o]}return r}}var SA=i=>typeof i=="number"?0:i;function wA(i){let e=xx(i);return yx(i)(e.map(SA))}var Si={test:vA,parse:xx,createTransformer:yx,getAnimatableNone:wA};var TA=new Set(["brightness","contrast","saturate","opacity"]);function EA(i){let[e,t]=i.slice(0,-1).split("(");if(e==="drop-shadow")return i;let[n]=t.match(Or)||[];if(!n)return i;let s=t.replace(n,""),r=TA.has(e)?1:0;return n!==t&&(r*=100),e+"("+r+s+")"}var AA=/\b([a-z-]*)\(.*?\)/gu,Bo={...Si,getAnimatableNone:i=>{let e=i.match(AA);return e?e.map(EA).join(" "):i}};var vx={borderWidth:Se,borderTopWidth:Se,borderRightWidth:Se,borderBottomWidth:Se,borderLeftWidth:Se,borderRadius:Se,radius:Se,borderTopLeftRadius:Se,borderTopRightRadius:Se,borderBottomRightRadius:Se,borderBottomLeftRadius:Se,width:Se,maxWidth:Se,height:Se,maxHeight:Se,top:Se,right:Se,bottom:Se,left:Se,padding:Se,paddingTop:Se,paddingRight:Se,paddingBottom:Se,paddingLeft:Se,margin:Se,marginTop:Se,marginRight:Se,marginBottom:Se,marginLeft:Se,backgroundPositionX:Se,backgroundPositionY:Se};var _x={rotate:Ki,rotateX:Ki,rotateY:Ki,rotateZ:Ki,scale:Uo,scaleX:Uo,scaleY:Uo,scaleZ:Uo,skew:Ki,skewX:Ki,skewY:Ki,distance:Se,translateX:Se,translateY:Se,translateZ:Se,x:Se,y:Se,z:Se,perspective:Se,transformPerspective:Se,opacity:Tn,originX:rp,originY:rp,originZ:Se};var fp={...Zi,transform:Math.round};var Nr={...vx,..._x,zIndex:fp,size:Se,fillOpacity:Tn,strokeOpacity:Tn,numOctaves:fp};var CA={...Nr,color:Pt,backgroundColor:Pt,outlineColor:Pt,fill:Pt,stroke:Pt,borderColor:Pt,borderTopColor:Pt,borderRightColor:Pt,borderBottomColor:Pt,borderLeftColor:Pt,filter:Bo,WebkitFilter:Bo},Fr=i=>CA[i];function Ll(i,e){let t=Fr(i);return t!==Bo&&(t=Si),t.getAnimatableNone?t.getAnimatableNone(e):void 0}var RA=new Set(["auto","none","0"]);function bx(i,e,t){let n=0,s;for(;n<i.length&&!s;){let r=i[n];typeof r=="string"&&!RA.has(r)&&Ls(r).values.length&&(s=i[n]),n++}if(s&&t)for(let r of e)i[r]=Ll(t,s)}var Br=class extends ts{constructor(e,t,n,s,r){super(e,t,n,s,r,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t||!t.current)return;super.readKeyframes();for(let l=0;l<e.length;l++){let c=e[l];if(typeof c=="string"&&(c=c.trim(),Lr(c))){let u=sp(c,t.current);u!==void 0&&(e[l]=u),l===e.length-1&&(this.finalKeyframe=c)}}if(this.resolveNoneKeyframes(),!rx.has(n)||e.length!==2)return;let[s,r]=e,o=lp(s),a=lp(r);if(o!==a)if(op(o)&&op(a))for(let l=0;l<e.length;l++){let c=e[l];typeof c=="string"&&(e[l]=parseFloat(c))}else this.needsMeasurement=!0}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let s=0;s<e.length;s++)Qg(e[s])&&n.push(s);n.length&&bx(e,n,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e||!e.current)return;n==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Is[n](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let s=t[t.length-1];s!==void 0&&e.getValue(n,s).jump(s,!1)}measureEndState(){var e;let{element:t,name:n,unresolvedKeyframes:s}=this;if(!t||!t.current)return;let r=t.getValue(n);r&&r.jump(this.measuredOrigin,!1);let o=s.length-1,a=s[o];s[o]=Is[n](t.measureViewportBox(),window.getComputedStyle(t.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),!((e=this.removedTransforms)===null||e===void 0)&&e.length&&this.removedTransforms.forEach(([l,c])=>{t.getValue(l).set(c)}),this.resolveNoneKeyframes()}};var dp=(i,e)=>e==="zIndex"?!1:!!(typeof i=="number"||Array.isArray(i)||typeof i=="string"&&(Si.test(i)||i==="0")&&!i.startsWith("url("));function PA(i){let e=i[0];if(i.length===1)return!0;for(let t=0;t<i.length;t++)if(i[t]!==e)return!0}function Mx(i,e,t,n){let s=i[0];if(s===null)return!1;if(e==="display"||e==="visibility")return!0;let r=i[i.length-1],o=dp(s,e),a=dp(r,e);return $n(o===a,`You are trying to animate ${e} from "${s}" to "${r}". ${s} is not an animatable value - to enable this animation set ${s} to a value animatable to ${r} via the \`style\` property.`),!o||!a?!1:PA(i)||(t==="spring"||Kn(t))&&n}var IA=40,zr=class{constructor({autoplay:e=!0,delay:t=0,type:n="keyframes",repeat:s=0,repeatDelay:r=0,repeatType:o="loop",...a}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=Mi.now(),this.options={autoplay:e,delay:t,type:n,repeat:s,repeatDelay:r,repeatType:o,...a},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>IA?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&ux(),this._resolved}onKeyframesResolved(e,t){this.resolvedAt=Mi.now(),this.hasAttemptedResolve=!0;let{name:n,type:s,velocity:r,delay:o,onComplete:a,onUpdate:l,isGenerator:c}=this.options;if(!c&&!Mx(e,n,s,r))if(bl.current||!o){l?.(jn(e,this.options,t)),a?.(),this.resolveFinishedPromise();return}else this.options.duration=0;let u=this.initPlayback(e,t);u!==!1&&(this._resolved={keyframes:e,finalKeyframe:t,...u},this.onPostResolved())}onPostResolved(){}then(e,t){return this.currentFinishedPromise.then(e,t)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(e=>{this.resolveFinishedPromise=e})}};function pp({keyframes:i,velocity:e=0,power:t=.8,timeConstant:n=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:u}){let h=i[0],f={done:!1,value:h},p=C=>a!==void 0&&C<a||l!==void 0&&C>l,g=C=>a===void 0?l:l===void 0||Math.abs(a-C)<Math.abs(l-C)?a:l,x=t*e,m=h+x,d=o===void 0?m:o(m);d!==m&&(x=d-h);let v=C=>-x*Math.exp(-C/n),M=C=>d+v(C),y=C=>{let S=v(C),_=M(C);f.done=Math.abs(S)<=c,f.value=f.done?d:_},A,T,R=C=>{p(f.value)&&(A=C,T=Pr({keyframes:[f.value,g(f.value)],velocity:pl(M,C,f.value),damping:s,stiffness:r,restDelta:c,restSpeed:u}))};return R(0),{calculatedDuration:null,next:C=>{let S=!1;return!T&&A===void 0&&(S=!0,y(C),R(C)),A!==void 0&&C>=A?T.next(C-A):(!S&&y(C),f)}}}var Sx=Qn(.42,0,1,1),wx=Qn(0,0,.58,1),Ol=Qn(.42,0,.58,1);var zo=i=>Array.isArray(i)&&typeof i[0]=="number";var Tx={linear:Gt,easeIn:Sx,easeInOut:Ol,easeOut:wx,circIn:El,circInOut:Al,circOut:jg,backIn:Oo,backInOut:wl,backOut:np,anticipate:Tl},ko=i=>{if(zo(i)){zi(i.length===4,"Cubic bezier arrays must contain four numerical values.");let[e,t,n,s]=i;return Qn(e,t,n,s)}else if(typeof i=="string")return zi(Tx[i]!==void 0,`Invalid easing type '${i}'`),Tx[i];return i};var DA=(i,e)=>t=>e(i(t)),kr=(...i)=>i.reduce(DA);function mp(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*(2/3-t)*6:i}function Ex({hue:i,saturation:e,lightness:t,alpha:n}){i/=360,e/=100,t/=100;let s=0,r=0,o=0;if(!e)s=r=o=t;else{let a=t<.5?t*(1+e):t+e-t*e,l=2*t-a;s=mp(l,a,i+1/3),r=mp(l,a,i),o=mp(l,a,i-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(o*255),alpha:n}}function Vr(i,e){return t=>t>0?e:i}var gp=(i,e,t)=>{let n=i*i,s=t*(e*e-n)+n;return s<0?0:Math.sqrt(s)},LA=[Fo,Ji,ns],OA=i=>LA.find(e=>e.test(i));function Ax(i){let e=OA(i);if($n(!!e,`'${i}' is not an animatable color. Use the equivalent color code instead.`),!e)return!1;let t=e.parse(i);return e===ns&&(t=Ex(t)),t}var xp=(i,e)=>{let t=Ax(i),n=Ax(e);if(!t||!n)return Vr(i,e);let s={...t};return r=>(s.red=gp(t.red,n.red,r),s.green=gp(t.green,n.green,r),s.blue=gp(t.blue,n.blue,r),s.alpha=$i(t.alpha,n.alpha,r),Ji.transform(s))};var Ul=new Set(["none","hidden"]);function Cx(i,e){return Ul.has(i)?t=>t<=0?i:e:t=>t>=1?e:i}function UA(i,e){return t=>$i(i,e,t)}function Nl(i){return typeof i=="number"?UA:typeof i=="string"?Lr(i)?Vr:Pt.test(i)?xp:BA:Array.isArray(i)?Rx:typeof i=="object"?Pt.test(i)?xp:NA:Vr}function Rx(i,e){let t=[...i],n=t.length,s=i.map((r,o)=>Nl(r)(r,e[o]));return r=>{for(let o=0;o<n;o++)t[o]=s[o](r);return t}}function NA(i,e){let t={...i,...e},n={};for(let s in t)i[s]!==void 0&&e[s]!==void 0&&(n[s]=Nl(i[s])(i[s],e[s]));return s=>{for(let r in n)t[r]=n[r](s);return t}}function FA(i,e){var t;let n=[],s={color:0,var:0,number:0};for(let r=0;r<e.values.length;r++){let o=e.types[r],a=i.indexes[o][s[o]],l=(t=i.values[a])!==null&&t!==void 0?t:0;n[r]=l,s[o]++}return n}var BA=(i,e)=>{let t=Si.createTransformer(e),n=Ls(i),s=Ls(e);return n.indexes.var.length===s.indexes.var.length&&n.indexes.color.length===s.indexes.color.length&&n.indexes.number.length>=s.indexes.number.length?Ul.has(i)&&!s.values.length||Ul.has(e)&&!n.values.length?Cx(i,e):kr(Rx(FA(n,s),s.values),t):($n(!0,`Complex values '${i}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`),Vr(i,e))};function Fl(i,e,t){return typeof i=="number"&&typeof e=="number"&&typeof t=="number"?$i(i,e,t):Nl(i)(i,e)}function zA(i,e,t){let n=[],s=t||Fl,r=i.length-1;for(let o=0;o<r;o++){let a=s(i[o],i[o+1]);if(e){let l=Array.isArray(e)?e[o]||Gt:e;a=kr(l,a)}n.push(a)}return n}function Bl(i,e,{clamp:t=!0,ease:n,mixer:s}={}){let r=i.length;if(zi(r===e.length,"Both input and output ranges must be the same length"),r===1)return()=>e[0];if(r===2&&i[0]===i[1])return()=>e[1];i[0]>i[r-1]&&(i=[...i].reverse(),e=[...e].reverse());let o=zA(e,n,s),a=o.length,l=c=>{let u=0;if(a>1)for(;u<i.length-2&&!(c<i[u+1]);u++);let h=Yi(i[u],i[u+1],c);return o[u](h)};return t?c=>l(pi(i[0],i[r-1],c)):l}function Px(i,e){return i.map(t=>t*e)}function kA(i,e){return i.map(()=>e||Ol).splice(0,i.length-1)}function Vo({duration:i=300,keyframes:e,times:t,ease:n="easeInOut"}){let s=yl(n)?n.map(ko):ko(n),r={done:!1,value:e[0]},o=Px(t&&t.length===e.length?t:Ir(e),i),a=Bl(o,e,{ease:Array.isArray(s)?s:kA(e,s)});return{calculatedDuration:i,next:l=>(r.value=a(l),r.done=l>=i,r)}}var Ix=i=>{let e=({timestamp:t})=>i(t);return{start:()=>bt.update(e,!0),stop:()=>Mn(e),now:()=>Zn.isProcessing?Zn.timestamp:Mi.now()}};var VA={decay:pp,inertia:pp,tween:Vo,keyframes:Vo,spring:Pr},HA=i=>i/100,Os=class extends zr{constructor(e){super(e),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();let{onStop:l}=this.options;l&&l()};let{name:t,motionValue:n,element:s,keyframes:r}=this.options,o=s?.KeyframeResolver||ts,a=(l,c)=>this.onKeyframesResolved(l,c);this.resolver=new o(r,a,t,n,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(e){let{type:t="keyframes",repeat:n=0,repeatDelay:s=0,repeatType:r,velocity:o=0}=this.options,a=Kn(t)?t:VA[t]||Vo,l,c;a!==Vo&&typeof e[0]!="number"&&(l=kr(HA,Fl(e[0],e[1])),e=[0,100]);let u=a({...this.options,keyframes:e});r==="mirror"&&(c=a({...this.options,keyframes:[...e].reverse(),velocity:-o})),u.calculatedDuration===null&&(u.calculatedDuration=Rr(u));let{calculatedDuration:h}=u,f=h+s,p=f*(n+1)-s;return{generator:u,mirroredGenerator:c,mapPercentToKeyframes:l,calculatedDuration:h,resolvedDuration:f,totalDuration:p}}onPostResolved(){let{autoplay:e=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!e?this.pause():this.state=this.pendingPlayState}tick(e,t=!1){let{resolved:n}=this;if(!n){let{keyframes:C}=this.options;return{done:!0,value:C[C.length-1]}}let{finalKeyframe:s,generator:r,mirroredGenerator:o,mapPercentToKeyframes:a,keyframes:l,calculatedDuration:c,totalDuration:u,resolvedDuration:h}=n;if(this.startTime===null)return r.next(0);let{delay:f,repeat:p,repeatType:g,repeatDelay:x,onUpdate:m}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-u/this.speed,this.startTime)),t?this.currentTime=e:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(e-this.startTime)*this.speed;let d=this.currentTime-f*(this.speed>=0?1:-1),v=this.speed>=0?d<0:d>u;this.currentTime=Math.max(d,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let M=this.currentTime,y=r;if(p){let C=Math.min(this.currentTime,u)/h,S=Math.floor(C),_=C%1;!_&&C>=1&&(_=1),_===1&&S--,S=Math.min(S,p+1),S%2&&(g==="reverse"?(_=1-_,x&&(_-=x/h)):g==="mirror"&&(y=o)),M=pi(0,1,_)*h}let A=v?{done:!1,value:l[0]}:y.next(M);a&&(A.value=a(A.value));let{done:T}=A;!v&&c!==null&&(T=this.speed>=0?this.currentTime>=u:this.currentTime<=0);let R=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&T);return R&&s!==void 0&&(A.value=jn(l,this.options,s)),m&&m(A.value),R&&this.finish(),A}get duration(){let{resolved:e}=this;return e?ni(e.calculatedDuration):0}get time(){return ni(this.currentTime)}set time(e){e=Wt(e),this.currentTime=e,this.holdTime!==null||this.speed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.speed)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;this.playbackSpeed=e,t&&(this.time=ni(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;let{driver:e=Ix,onPlay:t,startTime:n}=this.options;this.driver||(this.driver=e(r=>this.tick(r))),t&&t();let s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=n??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var e;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(e=this.currentTime)!==null&&e!==void 0?e:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";let{onComplete:e}=this.options;e&&e()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}};var Dx=new Set(["opacity","clipPath","filter","transform"]);var Lx={linearEasing:void 0};function Ox(i,e){let t=Ar(i);return()=>{var n;return(n=Lx[e])!==null&&n!==void 0?n:t()}}var Hr=Ox(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing");function vp(i){return!!(typeof i=="function"&&Hr()||!i||typeof i=="string"&&(i in yp||Hr())||zo(i)||Array.isArray(i)&&i.every(vp))}var Ho=([i,e,t,n])=>`cubic-bezier(${i}, ${e}, ${t}, ${n})`,yp={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Ho([0,.65,.55,1]),circOut:Ho([.55,0,1,.45]),backIn:Ho([.31,.01,.66,-.59]),backOut:Ho([.33,1.53,.69,.99])};function _p(i,e){if(i)return typeof i=="function"&&Hr()?dl(i,e):zo(i)?Ho(i):Array.isArray(i)?i.map(t=>_p(t,e)||yp.easeOut):yp[i]}function Ux(i,e,t,{delay:n=0,duration:s=300,repeat:r=0,repeatType:o="loop",ease:a="easeInOut",times:l}={}){let c={[e]:t};l&&(c.offset=l);let u=_p(a,s);return Array.isArray(u)&&(c.easing=u),i.animate(c,{delay:n,duration:s,easing:Array.isArray(u)?"linear":u,fill:"both",iterations:r+1,direction:o==="reverse"?"alternate":"normal"})}function bp(i,e){i.timeline=e,i.onfinish=null}var Nx=Ar(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));var zl=10,GA=2e4;function WA(i){return Kn(i.type)||i.type==="spring"||!vp(i.ease)}function XA(i,e){let t=new Os({...e,keyframes:i,repeat:0,delay:0,isGenerator:!0}),n={done:!1,value:i[0]},s=[],r=0;for(;!n.done&&r<GA;)n=t.sample(r),s.push(n.value),r+=zl;return{times:void 0,keyframes:s,duration:r-zl,ease:"linear"}}var Fx={anticipate:Tl,backInOut:wl,circInOut:Al};function qA(i){return i in Fx}var Go=class extends zr{constructor(e){super(e);let{name:t,motionValue:n,element:s,keyframes:r}=this.options;this.resolver=new Br(r,(o,a)=>this.onKeyframesResolved(o,a),t,n,s),this.resolver.scheduleResolve()}initPlayback(e,t){var n;let{duration:s=300,times:r,ease:o,type:a,motionValue:l,name:c,startTime:u}=this.options;if(!(!((n=l.owner)===null||n===void 0)&&n.current))return!1;if(typeof o=="string"&&Hr()&&qA(o)&&(o=Fx[o]),WA(this.options)){let{onComplete:f,onUpdate:p,motionValue:g,element:x,...m}=this.options,d=XA(e,m);e=d.keyframes,e.length===1&&(e[1]=e[0]),s=d.duration,r=d.times,o=d.ease,a="keyframes"}let h=Ux(l.owner.current,c,e,{...this.options,duration:s,times:r,ease:o});return h.startTime=u??this.calcStartTime(),this.pendingTimeline?(bp(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{let{onComplete:f}=this.options;l.set(jn(e,this.options,t)),f&&f(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:s,times:r,type:a,ease:o,keyframes:e}}get duration(){let{resolved:e}=this;if(!e)return 0;let{duration:t}=e;return ni(t)}get time(){let{resolved:e}=this;if(!e)return 0;let{animation:t}=e;return ni(t.currentTime||0)}set time(e){let{resolved:t}=this;if(!t)return;let{animation:n}=t;n.currentTime=Wt(e)}get speed(){let{resolved:e}=this;if(!e)return 1;let{animation:t}=e;return t.playbackRate}set speed(e){let{resolved:t}=this;if(!t)return;let{animation:n}=t;n.playbackRate=e}get state(){let{resolved:e}=this;if(!e)return"idle";let{animation:t}=e;return t.playState}get startTime(){let{resolved:e}=this;if(!e)return null;let{animation:t}=e;return t.startTime}attachTimeline(e){if(!this._resolved)this.pendingTimeline=e;else{let{resolved:t}=this;if(!t)return Gt;let{animation:n}=t;bp(n,e)}return Gt}play(){if(this.isStopped)return;let{resolved:e}=this;if(!e)return;let{animation:t}=e;t.playState==="finished"&&this.updateFinishedPromise(),t.play()}pause(){let{resolved:e}=this;if(!e)return;let{animation:t}=e;t.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();let{resolved:e}=this;if(!e)return;let{animation:t,keyframes:n,duration:s,type:r,ease:o,times:a}=e;if(t.playState==="idle"||t.playState==="finished")return;if(this.time){let{motionValue:c,onUpdate:u,onComplete:h,element:f,...p}=this.options,g=new Os({...p,keyframes:n,duration:s,type:r,ease:o,times:a,isGenerator:!0}),x=Wt(this.time);c.setWithVelocity(g.sample(x-zl).value,g.sample(x).value,zl)}let{onStop:l}=this.options;l&&l(),this.cancel()}complete(){let{resolved:e}=this;e&&e.animation.finish()}cancel(){let{resolved:e}=this;e&&e.animation.cancel()}static supports(e){let{motionValue:t,name:n,repeatDelay:s,repeatType:r,damping:o,type:a}=e;return Nx()&&n&&Dx.has(n)&&t&&t.owner&&t.owner.current instanceof HTMLElement&&!t.owner.getProps().onUpdate&&!s&&r!=="mirror"&&o!==0&&a!=="inertia"}};function Bx({when:i,delay:e,delayChildren:t,staggerChildren:n,staggerDirection:s,repeat:r,repeatType:o,repeatDelay:a,from:l,elapsed:c,...u}){return!!Object.keys(u).length}var kl=(i,e,t,n={},s,r)=>o=>{let a=_l(n,i)||{},l=a.delay||n.delay||0,{elapsed:c=0}=n;c=c-Wt(l);let u={keyframes:Array.isArray(t)?t:[null,t],ease:"easeOut",velocity:e.getVelocity(),...a,delay:-c,onUpdate:f=>{e.set(f),a.onUpdate&&a.onUpdate(f)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:i,motionValue:e,element:r?void 0:s};Bx(a)||(u={...u,...Kg(i,u)}),u.duration&&(u.duration=Wt(u.duration)),u.repeatDelay&&(u.repeatDelay=Wt(u.repeatDelay)),u.from!==void 0&&(u.keyframes[0]=u.from);let h=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(u.duration=0,u.delay===0&&(h=!0)),(bl.current||Er.skipAnimations)&&(h=!0,u.duration=0,u.delay=0),h&&!r&&e.get()!==void 0){let f=jn(u.keyframes,a);if(f!==void 0)return bt.update(()=>{u.onUpdate(f),u.onComplete()}),new Cr([])}return!r&&Go.supports(u)?new Go(u):new Os(u)};var zx=i=>Array.isArray(i);var kx=i=>zx(i)?i[i.length-1]||0:i;function Vx(i){let e=[{},{}];return i?.values.forEach((t,n)=>{e[0][n]=t.get(),e[1][n]=t.getVelocity()}),e}function Vl(i,e,t,n){if(typeof e=="function"){let[s,r]=Vx(n);e=e(t!==void 0?t:i.custom,s,r)}if(typeof e=="string"&&(e=i.variants&&i.variants[e]),typeof e=="function"){let[s,r]=Vx(n);e=e(t!==void 0?t:i.custom,s,r)}return e}function Hx(i,e,t){let n=i.getProps();return Vl(n,e,t!==void 0?t:n.custom,i)}function YA(i,e,t){i.hasValue(e)?i.getValue(e).set(t):i.addValue(e,Sn(t))}function Gx(i,e){let t=Hx(i,e),{transitionEnd:n={},transition:s={},...r}=t||{};r={...r,...n};for(let o in r){let a=kx(r[o]);YA(i,o,a)}}var Gr=i=>i.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase();var $A="framerAppearId",Wx="data-"+Gr($A);function Xx(i){return i.props[Wx]}function qx(i){return!!(pt(i)&&i.add)}function Yx(i,e){let t=i.getValue("willChange");if(qx(t))return t.add(e)}function ZA({protectedKeys:i,needsAnimating:e},t){let n=i.hasOwnProperty(t)&&e[t]!==!0;return e[t]=!1,n}function $x(i,e,{delay:t=0,transitionOverride:n,type:s}={}){var r;let{transition:o=i.getDefaultTransition(),transitionEnd:a,...l}=e;n&&(o=n);let c=[],u=s&&i.animationState&&i.animationState.getState()[s];for(let h in l){let f=i.getValue(h,(r=i.latestValues[h])!==null&&r!==void 0?r:null),p=l[h];if(p===void 0||u&&ZA(u,h))continue;let g={delay:t,..._l(o||{},h)},x=!1;if(window.MotionHandoffAnimation){let d=Xx(i);if(d){let v=window.MotionHandoffAnimation(d,h,bt);v!==null&&(g.startTime=v,x=!0)}}Yx(i,h),f.start(kl(h,f,p,i.shouldReduceMotion&&si.has(h)?{type:!1}:g,i,x));let m=f.animation;m&&c.push(m)}return a&&Promise.all(c).then(()=>{bt.update(()=>{a&&Gx(i,a)})}),c}function Zx(i){return i instanceof SVGElement&&i.tagName!=="svg"}var Kx={};function Jx(i,{layout:e,layoutId:t}){return si.has(i)||i.startsWith("origin")||(e||t!==void 0)&&(!!Kx[i]||i==="opacity")}function Hl(i,e,t){var n;let{style:s}=i,r={};for(let o in s)(pt(s[o])||e.style&&pt(e.style[o])||Jx(o,i)||((n=t?.getValue(o))===null||n===void 0?void 0:n.liveStyle)!==void 0)&&(r[o]=s[o]);return r}function jx(i,e,t){let n=Hl(i,e,t);for(let s in i)if(pt(i[s])||pt(e[s])){let r=Jn.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;n[r]=i[s]}return n}var Qx=typeof window<"u";var Wo={current:null},Gl={current:!1};function ey(){if(Gl.current=!0,!!Qx)if(window.matchMedia){let i=window.matchMedia("(prefers-reduced-motion)"),e=()=>Wo.current=i.matches;i.addListener(e),e()}else Wo.current=!1}function ty(i){return i!==null&&typeof i=="object"&&typeof i.start=="function"}function iy(i){return typeof i=="string"||Array.isArray(i)}var KA=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],ny=["initial",...KA];function Mp(i){return ty(i.animate)||ny.some(e=>iy(i[e]))}function sy(i){return!!(Mp(i)||i.variants)}function ry(i,e,t){for(let n in e){let s=e[n],r=t[n];if(pt(s))i.addValue(n,s);else if(pt(r))i.addValue(n,Sn(s,{owner:i}));else if(r!==s)if(i.hasValue(n)){let o=i.getValue(n);o.liveStyle===!0?o.jump(s):o.hasAnimated||o.set(s)}else{let o=i.getStaticValue(n);i.addValue(n,Sn(o!==void 0?o:s,{owner:i}))}}for(let n in t)e[n]===void 0&&i.removeValue(n);return e}var oy={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Wl={};for(let i in oy)Wl[i]={isEnabled:e=>oy[i].some(t=>!!e[t])};var JA=[...ap,Pt,Si],ay=i=>JA.find(Il(i));var ly=()=>({min:0,max:0}),Wr=()=>({x:ly(),y:ly()});var cy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Xr=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:s,blockInitialAnimation:r,visualState:o},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=ts,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let f=Mi.now();this.renderScheduledAt<f&&(this.renderScheduledAt=f,bt.render(this.render,!1,!0))};let{latestValues:l,renderState:c}=o;this.latestValues=l,this.baseTarget={...l},this.initialValues=t.initial?{...l}:{},this.renderState=c,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.blockInitialAnimation=!!r,this.isControllingVariants=Mp(t),this.isVariantNode=sy(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:u,...h}=this.scrapeMotionValuesFromProps(t,{},this);for(let f in h){let p=h[f];l[f]!==void 0&&pt(p)&&p.set(l[f],!1)}}mount(e){this.current=e,wn.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,n)=>this.bindToMotionValue(n,t)),Gl.current||ey(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Wo.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){wn.delete(this.current),this.projection&&this.projection.unmount(),Mn(this.notifyUpdate),Mn(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}bindToMotionValue(e,t){this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)();let n=si.has(e),s=t.on("change",a=>{this.latestValues[e]=a,this.props.onUpdate&&bt.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0)}),r=t.on("renderRequest",this.scheduleRender),o;window.MotionCheckAppearSync&&(o=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{s(),r(),o&&o(),t.owner&&t.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in Wl){let t=Wl[e];if(!t)continue;let{isEnabled:n,Feature:s}=t;if(!this.features[e]&&s&&n(this.props)&&(this.features[e]=new s(this)),this.features[e]){let r=this.features[e];r.isMounted?r.update():(r.mount(),r.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Wr()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let n=0;n<cy.length;n++){let s=cy[n];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);let r="on"+s,o=e[r];o&&(this.propEventSubscriptions[s]=this.on(s,o))}this.prevMotionValues=ry(this,this.scrapeMotionValuesFromProps(e,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let n=this.values.get(e);t!==n&&(n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return n===void 0&&t!==void 0&&(n=Sn(t===null?void 0:t,{owner:this}),this.addValue(e,n)),n}readValue(e,t){var n;let s=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:(n=this.getBaseTargetFromProps(this.props,e))!==null&&n!==void 0?n:this.readValueFromInstance(this.current,e,this.options);return s!=null&&(typeof s=="string"&&(Rl(s)||Cl(s))?s=parseFloat(s):!ay(s)&&Si.test(t)&&(s=Ll(e,t)),this.setBaseTarget(e,pt(s)?s.get():s)),pt(s)?s.get():s}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){var t;let{initial:n}=this.props,s;if(typeof n=="string"||typeof n=="object"){let o=Vl(this.props,n,(t=this.presenceContext)===null||t===void 0?void 0:t.custom);o&&(s=o[e])}if(n&&s!==void 0)return s;let r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!pt(r)?r:this.initialValues[e]!==void 0&&s===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new wr),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}};var qr=class extends Xr{constructor(){super(...arguments),this.KeyframeResolver=Br}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){return e.style?e.style[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;pt(e)&&(this.childSubscription=e.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}};var Xl=(i,e)=>e&&typeof i=="number"?e.transform(i):i;var jA={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},QA=Jn.length;function uy(i,e,t){let n="",s=!0;for(let r=0;r<QA;r++){let o=Jn[r],a=i[o];if(a===void 0)continue;let l=!0;if(typeof a=="number"?l=a===(o.startsWith("scale")?1:0):l=parseFloat(a)===0,!l||t){let c=Xl(a,Nr[o]);if(!l){s=!1;let u=jA[o]||o;n+=`${u}(${c}) `}t&&(e[o]=c)}}return n=n.trim(),t?n=t(e,s?"":n):s&&(n="none"),n}function ql(i,e,t){let{style:n,vars:s,transformOrigin:r}=i,o=!1,a=!1;for(let l in e){let c=e[l];if(si.has(l)){o=!0;continue}else if(Pl(l)){s[l]=c;continue}else{let u=Xl(c,Nr[l]);l.startsWith("origin")?(a=!0,r[l]=u):n[l]=u}}if(e.transform||(o||t?n.transform=uy(e,i.transform,t):n.transform&&(n.transform="none")),a){let{originX:l="50%",originY:c="50%",originZ:u=0}=r;n.transformOrigin=`${l} ${c} ${u}`}}function hy(i,e,t){return typeof i=="string"?i:Se.transform(e+t*i)}function fy(i,e,t){let n=hy(e,i.x,i.width),s=hy(t,i.y,i.height);return`${n} ${s}`}var e1={offset:"stroke-dashoffset",array:"stroke-dasharray"},t1={offset:"strokeDashoffset",array:"strokeDasharray"};function dy(i,e,t=1,n=0,s=!0){i.pathLength=1;let r=s?e1:t1;i[r.offset]=Se.transform(-n);let o=Se.transform(e),a=Se.transform(t);i[r.array]=`${o} ${a}`}function py(i,{attrX:e,attrY:t,attrScale:n,originX:s,originY:r,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...c},u,h){if(ql(i,c,h),u){i.style.viewBox&&(i.attrs.viewBox=i.style.viewBox);return}i.attrs=i.style,i.style={};let{attrs:f,style:p,dimensions:g}=i;f.transform&&(g&&(p.transform=f.transform),delete f.transform),g&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=fy(g,s!==void 0?s:.5,r!==void 0?r:.5)),e!==void 0&&(f.x=e),t!==void 0&&(f.y=t),n!==void 0&&(f.scale=n),o!==void 0&&dy(f,o,a,l,!1)}var Yl=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function $l(i,{style:e,vars:t},n,s){Object.assign(i.style,e,s&&s.getProjectionStyles(n));for(let r in t)i.style.setProperty(r,t[r])}function my(i,e,t,n){$l(i,e,void 0,n);for(let s in e.attrs)i.setAttribute(Yl.has(s)?s:Gr(s),e.attrs[s])}var gy=i=>typeof i=="string"&&i.toLowerCase()==="svg";var Zl=class extends qr{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Wr}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(si.has(t)){let n=Fr(t);return n&&n.default||0}return t=Yl.has(t)?t:Gr(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return jx(e,t,n)}build(e,t,n){py(e,t,this.isSVGTag,n.transformTemplate)}renderInstance(e,t,n,s){my(e,t,n,s)}mount(e){this.isSVGTag=gy(e.tagName),super.mount(e)}};function xy({top:i,left:e,right:t,bottom:n}){return{x:{min:e,max:t},y:{min:i,max:n}}}function yy(i,e){if(!e)return i;let t=e({x:i.left,y:i.top}),n=e({x:i.right,y:i.bottom});return{top:t.y,left:t.x,bottom:n.y,right:n.x}}function vy(i,e){return xy(yy(i.getBoundingClientRect(),e))}function i1(i){return window.getComputedStyle(i)}var Kl=class extends qr{constructor(){super(...arguments),this.type="html",this.renderInstance=$l}readValueFromInstance(e,t){if(si.has(t)){let n=Fr(t);return n&&n.default||0}else{let n=i1(e),s=(Pl(t)?n.getPropertyValue(t):n[t])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:t}){return vy(e,t)}build(e,t,n){ql(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return Hl(e,t,n)}};function n1(i,e){return i in e}var Jl=class extends Xr{constructor(){super(...arguments),this.type="object"}readValueFromInstance(e,t){if(n1(t,e)){let n=e[t];if(typeof n=="string"||typeof n=="number")return n}}getBaseTargetFromProps(){}removeValueFromRenderState(e,t){delete t.output[e]}measureInstanceViewportBox(){return Wr()}build(e,t){Object.assign(e.output,t)}renderInstance(e,{output:t}){Object.assign(e,t)}sortInstanceNodePosition(){return 0}};function _y(i){let e={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},t=Zx(i)?new Zl(e):new Kl(e);t.mount(i),wn.set(i,t)}function by(i){let e={presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}},t=new Jl(e);t.mount(i),wn.set(i,t)}function My(i,e,t){let n=pt(i)?i:Sn(i);return n.start(kl("",n,e,t)),n.animation}function s1(i,e){return pt(i)||typeof i=="number"||typeof i=="string"&&!Lo(e)}function jl(i,e,t,n){let s=[];if(s1(i,e))s.push(My(i,Lo(e)&&e.default||e,t&&(t.default||t)));else{let r=xl(i,e,n),o=r.length;zi(!!o,"No valid elements provided.");for(let a=0;a<o;a++){let l=r[a],c=l instanceof Element?_y:by;wn.has(l)||c(l);let u=wn.get(l),h={...t};"delay"in h&&typeof h.delay=="function"&&(h.delay=h.delay(a,o)),s.push(...$x(u,{...e,transition:h},{}))}}return s}function Sy(i,e,t){let n=[];return Zg(i,e,t,{spring:Pr}).forEach(({keyframes:r,transition:o},a)=>{n.push(...jl(a,r,o))}),n}function r1(i){return Array.isArray(i)&&Array.isArray(i[0])}function wy(i){function e(t,n,s){let r=[];r1(t)?r=Sy(t,n,i):r=jl(t,n,s,i);let o=new Cr(r);return i&&i.animations.push(o),o}return e}var Ty=wy();var Ql=new WeakMap,ss;function o1(i,e){if(e){let{inlineSize:t,blockSize:n}=e[0];return{width:t,height:n}}else return i instanceof SVGElement&&"getBBox"in i?i.getBBox():{width:i.offsetWidth,height:i.offsetHeight}}function a1({target:i,contentRect:e,borderBoxSize:t}){var n;(n=Ql.get(i))===null||n===void 0||n.forEach(s=>{s({target:i,contentSize:e,get size(){return o1(i,t)}})})}function l1(i){i.forEach(a1)}function c1(){typeof ResizeObserver>"u"||(ss=new ResizeObserver(l1))}function Ey(i,e){ss||c1();let t=Dr(i);return t.forEach(n=>{let s=Ql.get(n);s||(s=new Set,Ql.set(n,s)),s.add(e),ss?.observe(n)}),()=>{t.forEach(n=>{let s=Ql.get(n);s?.delete(e),s?.size||ss?.unobserve(n)})}}var ec=new Set,Xo;function u1(){Xo=()=>{let i={width:window.innerWidth,height:window.innerHeight},e={target:window,size:i,contentSize:i};ec.forEach(t=>t(e))},window.addEventListener("resize",Xo)}function Ay(i){return ec.add(i),Xo||u1(),()=>{ec.delete(i),!ec.size&&Xo&&(Xo=void 0)}}function Cy(i,e){return typeof i=="function"?Ay(i):Ey(i,e)}var h1=50,Ry=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Iy=()=>({time:0,x:Ry(),y:Ry()}),f1={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Py(i,e,t,n){let s=t[e],{length:r,position:o}=f1[e],a=s.current,l=t.time;s.current=i[`scroll${o}`],s.scrollLength=i[`scroll${r}`]-i[`client${r}`],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=Yi(0,s.scrollLength,s.current);let c=n-l;s.velocity=c>h1?0:Tr(s.current-a,c)}function Dy(i,e,t){Py(i,"x",e,t),Py(i,"y",e,t),e.time=t}function Ly(i,e){let t={x:0,y:0},n=i;for(;n&&n!==e;)if(n instanceof HTMLElement)t.x+=n.offsetLeft,t.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){let s=n.getBoundingClientRect();n=n.parentElement;let r=n.getBoundingClientRect();t.x+=s.left-r.left,t.y+=s.top-r.top}else if(n instanceof SVGGraphicsElement){let{x:s,y:r}=n.getBBox();t.x+=s,t.y+=r;let o=null,a=n.parentNode;for(;!o;)a.tagName==="svg"&&(o=a),a=n.parentNode;n=o}else break;return t}var Oy={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]};var tc={start:0,center:.5,end:1};function Sp(i,e,t=0){let n=0;if(i in tc&&(i=tc[i]),typeof i=="string"){let s=parseFloat(i);i.endsWith("px")?n=s:i.endsWith("%")?i=s/100:i.endsWith("vw")?n=s/100*document.documentElement.clientWidth:i.endsWith("vh")?n=s/100*document.documentElement.clientHeight:i=s}return typeof i=="number"&&(n=e*i),t+n}var d1=[0,0];function Uy(i,e,t,n){let s=Array.isArray(i)?i:d1,r=0,o=0;return typeof i=="number"?s=[i,i]:typeof i=="string"&&(i=i.trim(),i.includes(" ")?s=i.split(" "):s=[i,tc[i]?i:"0"]),r=Sp(s[0],t,n),o=Sp(s[1],e),r-o}var p1={x:0,y:0};function m1(i){return"getBBox"in i&&i.tagName!=="svg"?i.getBBox():{width:i.clientWidth,height:i.clientHeight}}function Ny(i,e,t){let{offset:n=Oy.All}=t,{target:s=i,axis:r="y"}=t,o=r==="y"?"height":"width",a=s!==i?Ly(s,i):p1,l=s===i?{width:i.scrollWidth,height:i.scrollHeight}:m1(s),c={width:i.clientWidth,height:i.clientHeight};e[r].offset.length=0;let u=!e[r].interpolate,h=n.length;for(let f=0;f<h;f++){let p=Uy(n[f],c[o],l[o],a[r]);!u&&p!==e[r].interpolatorOffsets[f]&&(u=!0),e[r].offset[f]=p}u&&(e[r].interpolate=Bl(e[r].offset,Ir(n)),e[r].interpolatorOffsets=[...e[r].offset]),e[r].progress=e[r].interpolate(e[r].current)}function g1(i,e=i,t){if(t.x.targetOffset=0,t.y.targetOffset=0,e!==i){let n=e;for(;n&&n!==i;)t.x.targetOffset+=n.offsetLeft,t.y.targetOffset+=n.offsetTop,n=n.offsetParent}t.x.targetLength=e===i?e.scrollWidth:e.clientWidth,t.y.targetLength=e===i?e.scrollHeight:e.clientHeight,t.x.containerLength=i.clientWidth,t.y.containerLength=i.clientHeight}function Fy(i,e,t,n={}){return{measure:()=>g1(i,n.target,t),update:s=>{Dy(i,t,s),(n.offset||n.target)&&Ny(i,t,n)},notify:()=>e(t)}}var qo=new WeakMap,By=new WeakMap,wp=new WeakMap,zy=i=>i===document.documentElement?window:i;function ic(i,{container:e=document.documentElement,...t}={}){let n=wp.get(e);n||(n=new Set,wp.set(e,n));let s=Iy(),r=Fy(e,i,s,t);if(n.add(r),!qo.has(e)){let a=()=>{for(let f of n)f.measure()},l=()=>{for(let f of n)f.update(Zn.timestamp)},c=()=>{for(let f of n)f.notify()},u=()=>{bt.read(a,!1,!0),bt.read(l,!1,!0),bt.update(c,!1,!0)};qo.set(e,u);let h=zy(e);window.addEventListener("resize",u,{passive:!0}),e!==document.documentElement&&By.set(e,Cy(e,u)),h.addEventListener("scroll",u,{passive:!0})}let o=qo.get(e);return bt.read(o,!1,!0),()=>{var a;Mn(o);let l=wp.get(e);if(!l||(l.delete(r),l.size))return;let c=qo.get(e);qo.delete(e),c&&(zy(e).removeEventListener("scroll",c),(a=By.get(e))===null||a===void 0||a(),window.removeEventListener("resize",c))}}function Tp(i,e){let t,n=()=>{let{currentTime:s}=e,o=(s===null?0:s.value)/100;t!==o&&i(o),t=o};return bt.update(n,!0),()=>Mn(n)}function x1({source:i,container:e,axis:t="y"}){i&&(e=i);let n={value:0},s=ic(r=>{n.value=r[t].progress*100},{container:e,axis:t});return{currentTime:n,cancel:s}}var Ep=new Map;function ky({source:i,container:e=document.documentElement,axis:t="y"}={}){i&&(e=i),Ep.has(e)||Ep.set(e,{});let n=Ep.get(e);return n[t]||(n[t]=fl()?new ScrollTimeline({source:e,axis:t}):x1({source:e,axis:t})),n[t]}function y1(i){return i.length===2}function Vy(i){return i&&(i.target||i.offset)}function v1(i,e){return y1(i)||Vy(e)?ic(t=>{i(t[e.axis].progress,t)},e):Tp(i,ky(e))}function _1(i,e){if(i.flatten(),Vy(e))return i.pause(),ic(t=>{i.time=i.duration*t[e.axis].progress},e);{let t=ky(e);return i.attachTimeline?i.attachTimeline(t,n=>(n.pause(),Tp(s=>{n.time=n.duration*s},t))):Gt}}function Hy(i,{axis:e="y",...t}={}){let n={axis:e,...t};return typeof i=="function"?v1(i,n):_1(i,n)}var b1={some:0,all:1};function Gy(i,e,{root:t,margin:n,amount:s="some"}={}){let r=Dr(i),o=new WeakMap,a=c=>{c.forEach(u=>{let h=o.get(u.target);if(u.isIntersecting!==!!h)if(u.isIntersecting){let f=e(u);typeof f=="function"?o.set(u.target,f):l.unobserve(u.target)}else h&&(h(u),o.delete(u.target))})},l=new IntersectionObserver(a,{root:t,rootMargin:n,threshold:typeof s=="number"?s:b1[s]});return r.forEach(c=>l.observe(c)),()=>l.disconnect()}function M1(i,e){if(i==="first")return 0;{let t=e-1;return i==="last"?t:t/2}}function Wy(i=.1,{startDelay:e=0,from:t=0,ease:n}={}){return(s,r)=>{let o=typeof t=="number"?t:M1(t,r),a=Math.abs(o-s),l=i*a;if(n){let c=r*i;l=ko(n)(l/c)*c}return e+l}}var En="generated",Xy="pointerdown",qy="pointerup",Yo="pointerleave",Yy="pointerout",mi="pointermove",$y="touchstart",Ap="touchend",Zy="touchmove",Ky="touchcancel",Jy="resize",jy="visibilitychange",It="tsParticles - Error";var Dt;(function(i){i.bottom="bottom",i.bottomLeft="bottom-left",i.bottomRight="bottom-right",i.left="left",i.none="none",i.right="right",i.top="top",i.topLeft="top-left",i.topRight="top-right",i.outside="outside",i.inside="inside"})(Dt||(Dt={}));function nc(i){return typeof i=="boolean"}function wi(i){return typeof i=="string"}function ki(i){return typeof i=="number"}function An(i){return typeof i=="object"&&i!==null}function Kt(i){return Array.isArray(i)}function N(i){return i==null}var ji={x:0,y:0,z:0},Qy=2,S1=1,Yr=class i{constructor(e,t,n){if(this._updateFromAngle=(s,r)=>{this.x=Math.cos(s)*r,this.y=Math.sin(s)*r},!ki(e)&&e){this.x=e.x,this.y=e.y;let s=e;this.z=s.z?s.z:ji.z}else if(e!==void 0&&t!==void 0)this.x=e,this.y=t,this.z=n??ji.z;else throw new Error(`${It} Vector3d not initialized correctly`)}static get origin(){return i.create(ji.x,ji.y,ji.z)}get angle(){return Math.atan2(this.y,this.x)}set angle(e){this._updateFromAngle(e,this.length)}get length(){return Math.sqrt(this.getLengthSq())}set length(e){this._updateFromAngle(this.angle,e)}static clone(e){return i.create(e.x,e.y,e.z)}static create(e,t,n){return new i(e,t,n)}add(e){return i.create(this.x+e.x,this.y+e.y,this.z+e.z)}addTo(e){this.x+=e.x,this.y+=e.y,this.z+=e.z}copy(){return i.clone(this)}distanceTo(e){return this.sub(e).length}distanceToSq(e){return this.sub(e).getLengthSq()}div(e){return i.create(this.x/e,this.y/e,this.z/e)}divTo(e){this.x/=e,this.y/=e,this.z/=e}getLengthSq(){return this.x**Qy+this.y**Qy}mult(e){return i.create(this.x*e,this.y*e,this.z*e)}multTo(e){this.x*=e,this.y*=e,this.z*=e}normalize(){let e=this.length;e!=0&&this.multTo(S1/e)}rotate(e){return i.create(this.x*Math.cos(e)-this.y*Math.sin(e),this.x*Math.sin(e)+this.y*Math.cos(e),ji.z)}setTo(e){this.x=e.x,this.y=e.y;let t=e;this.z=t.z?t.z:ji.z}sub(e){return i.create(this.x-e.x,this.y-e.y,this.z-e.z)}subFrom(e){this.x-=e.x,this.y-=e.y,this.z-=e.z}},ht=class i extends Yr{constructor(e,t){super(e,t,ji.z)}static get origin(){return i.create(ji.x,ji.y)}static clone(e){return i.create(e.x,e.y)}static create(e,t){return new i(e,t)}};var w1=Math.random,ev={nextFrame:i=>requestAnimationFrame(i),cancel:i=>cancelAnimationFrame(i)},T1=2,E1=Math.PI*T1;function ke(){return At(w1(),0,1-Number.EPSILON)}function tv(i){return ev.nextFrame(i)}function iv(i){ev.cancel(i)}function At(i,e,t){return Math.min(Math.max(i,e),t)}function sc(i,e,t,n){return Math.floor((i*t+e*n)/(t+n))}function Bt(i){let e=Jt(i),t=0,n=$r(i);return e===n&&(n=t),ke()*(e-n)+n}function ie(i){return ki(i)?i:Bt(i)}function $r(i){return ki(i)?i:i.min}function Jt(i){return ki(i)?i:i.max}function Ae(i,e){if(i===e||e===void 0&&ki(i))return i;let t=$r(i),n=Jt(i);return e!==void 0?{min:Math.min(t,e),max:Math.max(n,e)}:Ae(t,n)}function mt(i,e){let t=i.x-e.x,n=i.y-e.y,s=2;return{dx:t,dy:n,distance:Math.sqrt(t**s+n**s)}}function xt(i,e){return mt(i,e).distance}function Ei(i){return i*Math.PI/180}function nv(i,e,t){if(ki(i))return Ei(i);let n=0,s=.5,r=.25,o=s+r;switch(i){case Dt.top:return-Math.PI*s;case Dt.topRight:return-Math.PI*r;case Dt.right:return n;case Dt.bottomRight:return Math.PI*r;case Dt.bottom:return Math.PI*s;case Dt.bottomLeft:return Math.PI*o;case Dt.left:return Math.PI;case Dt.topLeft:return-Math.PI*o;case Dt.inside:return Math.atan2(t.y-e.y,t.x-e.x);case Dt.outside:return Math.atan2(e.y-t.y,e.x-t.x);default:return ke()*E1}}function sv(i){let e=ht.origin;return e.length=1,e.angle=i,e}function Cp(i,e,t,n){return ht.create(i.x*(t-n)/(t+n)+e.x*2*n/(t+n),i.y)}function rv(i){return{x:i.position?.x??ke()*i.size.width,y:i.position?.y??ke()*i.size.height}}function rc(i){return i?i.endsWith("%")?parseFloat(i)/100:parseFloat(i):1}var Cn;(function(i){i.auto="auto",i.increase="increase",i.decrease="decrease",i.random="random"})(Cn||(Cn={}));var yt;(function(i){i.increasing="increasing",i.decreasing="decreasing"})(yt||(yt={}));var Vi;(function(i){i.none="none",i.max="max",i.min="min"})(Vi||(Vi={}));var Ue;(function(i){i.bottom="bottom",i.left="left",i.right="right",i.top="top"})(Ue||(Ue={}));var Qi;(function(i){i.precise="precise",i.percent="percent"})(Qi||(Qi={}));var rs;(function(i){i.max="max",i.min="min",i.random="random"})(rs||(rs={}));var A1={debug:console.debug,error:console.error,info:console.info,log:console.log,verbose:console.log,warning:console.warn};function Ai(){return A1}function av(i){let e={bounced:!1},{pSide:t,pOtherSide:n,rectSide:s,rectOtherSide:r,velocity:o,factor:a}=i,l=.5,c=0;return n.min<r.min||n.min>r.max||n.max<r.min||n.max>r.max||(t.max>=s.min&&t.max<=(s.max+s.min)*l&&o>c||t.min<=s.max&&t.min>(s.max+s.min)*l&&o<c)&&(e.velocity=o*-a,e.bounced=!0),e}function C1(i,e){let t=Ct(e,n=>i.matches(n));return Kt(t)?t.some(n=>n):t}function en(){return typeof window>"u"||!window||typeof window.document>"u"||!window.document}function R1(){return!en()&&typeof matchMedia<"u"}function oc(i){if(R1())return matchMedia(i)}function lv(i){if(!(en()||typeof IntersectionObserver>"u"))return new IntersectionObserver(i)}function cv(i){if(!(en()||typeof MutationObserver>"u"))return new MutationObserver(i)}function Qe(i,e){return i===e||Kt(e)&&e.indexOf(i)>-1}async function Rp(i,e){try{await document.fonts.load(`${e??"400"} 36px '${i??"Verdana"}'`)}catch{}}function P1(i){return Math.floor(ke()*i.length)}function Zr(i,e,t=!0){return i[e!==void 0&&t?e%i.length:P1(i)]}function Kr(i,e,t,n,s){return I1(os(i,n??0),e,t,s)}function I1(i,e,t,n){let s=!0;return(!n||n===Ue.bottom)&&(s=i.top<e.height+t.x),s&&(!n||n===Ue.left)&&(s=i.right>t.x),s&&(!n||n===Ue.right)&&(s=i.left<e.width+t.y),s&&(!n||n===Ue.top)&&(s=i.bottom>t.y),s}function os(i,e){return{bottom:i.y+e,left:i.x-e,right:i.x+e,top:i.y-e}}function nt(i,...e){for(let t of e){if(t==null)continue;if(!An(t)){i=t;continue}let n=Array.isArray(t);n&&(An(i)||!i||!Array.isArray(i))?i=[]:!n&&(An(i)||!i||Array.isArray(i))&&(i={});for(let s in t){if(s==="__proto__")continue;let r=t,o=r[s],a=i;a[s]=An(o)&&Array.isArray(o)?o.map(l=>nt(a[s],l)):nt(a[s],o)}}return i}function Jr(i,e){return!!hv(e,t=>t.enable&&Qe(i,t.mode))}function jr(i,e,t){Ct(e,n=>{let s=n.mode;n.enable&&Qe(i,s)&&D1(n,t)})}function D1(i,e){let t=i.selectors;Ct(t,n=>{e(n,i)})}function ac(i,e){if(!(!e||!i))return hv(i,t=>C1(e,t.selectors))}function $o(i){return{position:i.getPosition(),radius:i.getRadius(),mass:i.getMass(),velocity:i.velocity,factor:ht.create(ie(i.options.bounce.horizontal.value),ie(i.options.bounce.vertical.value))}}function lc(i,e){let{x:t,y:n}=i.velocity.sub(e.velocity),[s,r]=[i.position,e.position],{dx:o,dy:a}=mt(r,s);if(t*o+n*a<0)return;let c=-Math.atan2(a,o),u=i.mass,h=e.mass,f=i.velocity.rotate(c),p=e.velocity.rotate(c),g=Cp(f,p,u,h),x=Cp(p,f,u,h),m=g.rotate(-c),d=x.rotate(-c);i.velocity.x=m.x*i.factor.x,i.velocity.y=m.y*i.factor.y,e.velocity.x=d.x*e.factor.x,e.velocity.y=d.y*e.factor.y}function uv(i,e){let t=i.getPosition(),n=i.getRadius(),s=os(t,n),r=i.options.bounce,o=av({pSide:{min:s.left,max:s.right},pOtherSide:{min:s.top,max:s.bottom},rectSide:{min:e.left,max:e.right},rectOtherSide:{min:e.top,max:e.bottom},velocity:i.velocity.x,factor:ie(r.horizontal.value)});o.bounced&&(o.velocity!==void 0&&(i.velocity.x=o.velocity),o.position!==void 0&&(i.position.x=o.position));let a=av({pSide:{min:s.top,max:s.bottom},pOtherSide:{min:s.left,max:s.right},rectSide:{min:e.top,max:e.bottom},rectOtherSide:{min:e.left,max:e.right},velocity:i.velocity.y,factor:ie(r.vertical.value)});a.bounced&&(a.velocity!==void 0&&(i.velocity.y=a.velocity),a.position!==void 0&&(i.position.y=a.position))}function Ct(i,e){return Kt(i)?i.map((n,s)=>e(n,s)):e(i,0)}function Xt(i,e,t){return Kt(i)?Zr(i,e,t):i}function hv(i,e){return Kt(i)?i.find((n,s)=>e(n,s)):e(i,0)?i:void 0}function cc(i,e){let t=i.value,n=i.animation,s={delayTime:ie(n.delay)*1e3,enable:n.enable,value:ie(i.value)*e,max:Jt(t)*e,min:$r(t)*e,loops:0,maxLoops:ie(n.count),time:0},r=1;if(n.enable){switch(s.decay=r-ie(n.decay),n.mode){case Cn.increase:s.status=yt.increasing;break;case Cn.decrease:s.status=yt.decreasing;break;case Cn.random:s.status=ke()>=.5?yt.increasing:yt.decreasing;break}let o=n.mode===Cn.auto;switch(n.startValue){case rs.min:s.value=s.min,o&&(s.status=yt.increasing);break;case rs.max:s.value=s.max,o&&(s.status=yt.decreasing);break;case rs.random:default:s.value=Bt(s),o&&(s.status=ke()>=.5?yt.increasing:yt.decreasing);break}}return s.initialValue=s.value,s}function L1(i,e){if(!(i.mode===Qi.percent)){let{mode:s,...r}=i;return r}return"x"in i?{x:i.x/100*e.width,y:i.y/100*e.height}:{width:i.width/100*e.width,height:i.height/100*e.height}}function uc(i,e){return L1(i,e)}function O1(i,e,t,n,s){switch(e){case Vi.max:t>=s&&i.destroy();break;case Vi.min:t<=n&&i.destroy();break}}function Qr(i,e,t,n,s){if(i.destroyed||!e||!e.enable||(e.maxLoops??0)>0&&(e.loops??0)>(e.maxLoops??0))return;let u=(e.velocity??0)*s.factor,h=e.min,f=e.max,p=e.decay??1;if(e.time||(e.time=0),(e.delayTime??0)>0&&e.time<(e.delayTime??0)&&(e.time+=s.value),!((e.delayTime??0)>0&&e.time<(e.delayTime??0))){switch(e.status){case yt.increasing:e.value>=f?(t?e.status=yt.decreasing:e.value-=f,e.loops||(e.loops=0),e.loops++):e.value+=u;break;case yt.decreasing:e.value<=h?(t?e.status=yt.increasing:e.value+=f,e.loops||(e.loops=0),e.loops++):e.value-=u}e.velocity&&p!==1&&(e.velocity*=p),O1(i,n,e.value,h,f),i.destroyed||(e.value=At(e.value,h,f))}}function ae(i,e){if(i.version!==e)throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${i.version}. Plugins version: ${e}`)}var hc;(function(i){i.darken="darken",i.enlighten="enlighten"})(hc||(hc={}));var dc="random",fc="mid";function U1(i,e){if(e){for(let t of i.colorManagers.values())if(e.startsWith(t.stringPrefix))return t.parseString(e)}}function jt(i,e,t,n=!0){if(!e)return;let s=wi(e)?{value:e}:e;if(wi(s.value))return fv(i,s.value,t,n);if(Kt(s.value))return jt(i,{value:Zr(s.value,t,n)});for(let r of i.colorManagers.values()){let o=r.handleRangeColor(s);if(o)return o}}function fv(i,e,t,n=!0){if(!e)return;let s=wi(e)?{value:e}:e;if(wi(s.value))return s.value===dc?pv():N1(i,s.value);if(Kt(s.value))return fv(i,{value:Zr(s.value,t,n)});for(let r of i.colorManagers.values()){let o=r.handleColor(s);if(o)return o}}function Rn(i,e,t,n=!0){let s=jt(i,e,t,n);return s?Dp(s):void 0}function Dp(i){let u=i.r/255,h=i.g/255,f=i.b/255,p=Math.max(u,h,f),g=Math.min(u,h,f),x={h:0,l:(p+g)*.5,s:0};return p!==g&&(x.s=x.l<.5?(p-g)/(p+g):(p-g)/(2-p-g),x.h=u===p?(h-f)/(p-g):x.h=h===p?2+(f-u)/(p-g):4+(u-h)/(p-g)),x.l*=100,x.s*=100,x.h*=60,x.h<0&&(x.h+=360),x.h>=360&&(x.h-=360),x}function N1(i,e){return U1(i,e)}function Us(i){let o=(i.h%360+360)%360,a=Math.max(0,Math.min(100,i.s)),l=Math.max(0,Math.min(100,i.l)),c=o/360,u=a/100,h=l/100,f=255,p=3;if(a===0){let S=Math.round(h*f);return{r:S,g:S,b:S}}let g=.5,x=2,m=(S,_,P)=>{if(P<0&&P++,P>1&&P--,P*6<1)return S+(_-S)*6*P;if(P*x<1)return _;if(P*p<1*x){let J=x/p;return S+(_-S)*(J-P)*6}return S},d=1,v=h<g?h*(d+u):h+u-h*u,M=x*h-v,y=1,A=y/p,T=Math.min(f,f*m(M,v,c+A)),R=Math.min(f,f*m(M,v,c)),C=Math.min(f,f*m(M,v,c-A));return{r:Math.round(T),g:Math.round(R),b:Math.round(C)}}function dv(i){let e=Us(i);return{a:i.a,b:e.b,g:e.g,r:e.r}}function pv(i){let t=i??0,n=256;return{b:Math.floor(Bt(Ae(t,n))),g:Math.floor(Bt(Ae(t,n))),r:Math.floor(Bt(Ae(t,n)))}}function ri(i,e){return`rgba(${i.r}, ${i.g}, ${i.b}, ${e??1})`}function as(i,e){return`hsla(${i.h}, ${i.s}%, ${i.l}%, ${e??1})`}function Zo(i,e,t,n){let s=i,r=e;return s.r===void 0&&(s=Us(i)),r.r===void 0&&(r=Us(e)),{b:sc(s.b,r.b,t,n),g:sc(s.g,r.g,t,n),r:sc(s.r,r.r,t,n)}}function Ko(i,e,t){if(t===dc)return pv();if(t===fc){let n=i.getFillColor()??i.getStrokeColor(),s=e?.getFillColor()??e?.getStrokeColor();if(n&&s&&e)return Zo(n,s,i.getRadius(),e.getRadius());{let r=n??s;if(r)return Us(r)}}else return t}function pc(i,e,t,n){let s=wi(e)?e:e.value;return s===dc?n?jt(i,{value:s}):t?dc:fc:s===fc?fc:jt(i,{value:s})}function Lp(i){return i!==void 0?{h:i.h.value,s:i.s.value,l:i.l.value}:void 0}function mc(i,e,t){let n={h:{enable:!1,value:i.h},s:{enable:!1,value:i.s},l:{enable:!1,value:i.l}};return e&&(Pp(n.h,e.h,t),Pp(n.s,e.s,t),Pp(n.l,e.l,t)),n}function Pp(i,e,t){i.enable=e.enable;let n=0,s=1,r=0,o=0;i.enable?(i.velocity=ie(e.speed)/100*t,i.decay=s-ie(e.decay),i.status=yt.increasing,i.loops=r,i.maxLoops=ie(e.count),i.time=o,i.delayTime=ie(e.delay)*1e3,e.sync||(i.velocity*=ke(),i.value*=ke()),i.initialValue=i.value,i.offset=Ae(e.offset)):i.velocity=n}function Ip(i,e,t,n){if(!i||!i.enable||(i.maxLoops??0)>0&&(i.loops??0)>(i.maxLoops??0)||(i.time||(i.time=0),(i.delayTime??0)>0&&i.time<(i.delayTime??0)&&(i.time+=n.value),(i.delayTime??0)>0&&i.time<(i.delayTime??0)))return;let u=i.offset?Bt(i.offset):0,h=(i.velocity??0)*n.factor+u*3.6,f=i.decay??1,p=Jt(e),g=$r(e);!t||i.status===yt.increasing?(i.value+=h,i.value>p&&(i.loops||(i.loops=0),i.loops++,t?i.status=yt.decreasing:i.value-=p)):(i.value-=h,i.value<0&&(i.loops||(i.loops=0),i.loops++,i.status=yt.increasing)),i.velocity&&f!==1&&(i.velocity*=f),i.value=At(i.value,g,p)}function gc(i,e){if(!i)return;let{h:t,s:n,l:s}=i,r={h:{min:0,max:360},s:{min:0,max:100},l:{min:0,max:100}};t&&Ip(t,r.h,!1,e),n&&Ip(n,r.s,!0,e),s&&Ip(s,r.l,!0,e)}var eo={x:0,y:0},xc={a:1,b:0,c:0,d:1};function ls(i,e,t){i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.closePath()}function mv(i,e,t){i.fillStyle=t??"rgba(0,0,0,0)",i.fillRect(eo.x,eo.y,e.width,e.height)}function gv(i,e,t,n){t&&(i.globalAlpha=n,i.drawImage(t,eo.x,eo.y,e.width,e.height),i.globalAlpha=1)}function yc(i,e){i.clearRect(eo.x,eo.y,e.width,e.height)}function xv(i){let{container:e,context:t,particle:n,delta:s,colorStyles:r,backgroundMask:o,composite:a,radius:l,opacity:c,shadow:u,transform:h}=i,f=n.getPosition(),p=0,g=n.rotation+(n.pathRotation?n.velocity.angle:p),x={sin:Math.sin(g),cos:Math.cos(g)},m=!!g,d=1,v={a:x.cos*(h.a??xc.a),b:m?x.sin*(h.b??d):h.b??xc.b,c:m?-x.sin*(h.c??d):h.c??xc.c,d:x.cos*(h.d??xc.d)};t.setTransform(v.a,v.b,v.c,v.d,f.x,f.y),o&&(t.globalCompositeOperation=a);let M=n.shadowColor;u.enable&&M&&(t.shadowBlur=u.blur,t.shadowColor=ri(M),t.shadowOffsetX=u.offset.x,t.shadowOffsetY=u.offset.y),r.fill&&(t.fillStyle=r.fill);let y=0,A=n.strokeWidth??y;t.lineWidth=A,r.stroke&&(t.strokeStyle=r.stroke);let T={container:e,context:t,particle:n,radius:l,opacity:c,delta:s,transformData:v,strokeWidth:A};B1(T),z1(T),F1(T),t.globalCompositeOperation="source-over",t.resetTransform()}function F1(i){let{container:e,context:t,particle:n,radius:s,opacity:r,delta:o,transformData:a}=i;if(!n.effect)return;let l=e.effectDrawers.get(n.effect);l&&l.draw({context:t,particle:n,radius:s,opacity:r,delta:o,pixelRatio:e.retina.pixelRatio,transformData:{...a}})}function B1(i){let{container:e,context:t,particle:n,radius:s,opacity:r,delta:o,strokeWidth:a,transformData:l}=i,c=0;if(!n.shape)return;let u=e.shapeDrawers.get(n.shape);u&&(t.beginPath(),u.draw({context:t,particle:n,radius:s,opacity:r,delta:o,pixelRatio:e.retina.pixelRatio,transformData:{...l}}),n.shapeClose&&t.closePath(),a>c&&t.stroke(),n.shapeFill&&t.fill())}function z1(i){let{container:e,context:t,particle:n,radius:s,opacity:r,delta:o,transformData:a}=i;if(!n.shape)return;let l=e.shapeDrawers.get(n.shape);l?.afterDraw&&l.afterDraw({context:t,particle:n,radius:s,opacity:r,delta:o,pixelRatio:e.retina.pixelRatio,transformData:{...a}})}function yv(i,e,t){e.draw&&e.draw(i,t)}function vv(i,e,t,n){e.drawParticle&&e.drawParticle(i,t,n)}function _v(i,e,t){return{h:i.h,s:i.s,l:i.l+(e===hc.darken?-1:1)*t}}function k1(i,e,t){let n=e[t],s=1;n!==void 0&&(i[t]=(i[t]??s)*n)}function bv(i,e,t=!1){if(!e)return;let n=i;if(!n)return;let s=n.style;if(s)for(let r in e){let o=e[r];s.setProperty(r,o,t?"important":"")}}var vc=class{constructor(e,t){this.container=e,this._applyPostDrawUpdaters=r=>{for(let o of this._postDrawUpdaters)o.afterDraw?.(r)},this._applyPreDrawUpdaters=(r,o,a,l,c,u)=>{for(let h of this._preDrawUpdaters){if(h.getColorStyles){let{fill:f,stroke:p}=h.getColorStyles(o,r,a,l);f&&(c.fill=f),p&&(c.stroke=p)}if(h.getTransformValues){let f=h.getTransformValues(o);for(let p in f)k1(u,f,p)}h.beforeDraw?.(o)}},this._applyResizePlugins=()=>{for(let r of this._resizePlugins)r.resize?.()},this._getPluginParticleColors=r=>{let o,a;for(let l of this._colorPlugins)if(!o&&l.particleFillColor&&(o=Rn(this._engine,l.particleFillColor(r))),!a&&l.particleStrokeColor&&(a=Rn(this._engine,l.particleStrokeColor(r))),o&&a)break;return[o,a]},this._initCover=async()=>{let r=this.container.actualOptions,o=r.backgroundMask.cover,a=o.color;if(a){let l=jt(this._engine,a);if(l){let c={...l,a:o.opacity};this._coverColorStyle=ri(c,c.a)}}else await new Promise((l,c)=>{if(!o.image)return;let u=document.createElement("img");u.addEventListener("load",()=>{this._coverImage={image:u,opacity:o.opacity},l()}),u.addEventListener("error",h=>{c(h.error)}),u.src=o.image})},this._initStyle=()=>{let r=this.element,o=this.container.actualOptions;if(r){this._fullScreen?(this._originalStyle=nt({},r.style),this._setFullScreenStyle()):this._resetOriginalStyle();for(let a in o.style){if(!a||!o.style)continue;let l=o.style[a];l&&r.style.setProperty(a,l,"important")}}},this._initTrail=async()=>{let r=this.container.actualOptions,o=r.particles.move.trail,a=o.fill;if(!o.enable)return;let l=1,c=l/o.length;if(a.color){let u=jt(this._engine,a.color);if(!u)return;this._trailFill={color:{...u},opacity:c}}else await new Promise((u,h)=>{if(!a.image)return;let f=document.createElement("img");f.addEventListener("load",()=>{this._trailFill={image:f,opacity:c},u()}),f.addEventListener("error",p=>{h(p.error)}),f.src=a.image})},this._paintBase=r=>{this.draw(o=>mv(o,this.size,r))},this._paintImage=(r,o)=>{this.draw(a=>gv(a,this.size,r,o))},this._repairStyle=()=>{let r=this.element;r&&(this._safeMutationObserver(o=>o.disconnect()),this._initStyle(),this.initBackground(),this._safeMutationObserver(o=>{!r||!(r instanceof Node)||o.observe(r,{attributes:!0})}))},this._resetOriginalStyle=()=>{let r=this.element,o=this._originalStyle;r&&o&&bv(r,o)},this._safeMutationObserver=r=>{this._mutationObserver&&r(this._mutationObserver)},this._setFullScreenStyle=()=>{let r=this.element;if(!r)return;let o=10,a=this.container.actualOptions.fullScreen.zIndex.toString(o);bv(r,{position:"fixed","z-index":a,zIndex:a,top:"0",left:"0",width:"100%",height:"100%"},!0)},this._engine=t,this._standardSize={height:0,width:0};let n=e.retina.pixelRatio,s=this._standardSize;this.size={height:s.height*n,width:s.width*n},this._context=null,this._generated=!1,this._preDrawUpdaters=[],this._postDrawUpdaters=[],this._resizePlugins=[],this._colorPlugins=[]}get _fullScreen(){return this.container.actualOptions.fullScreen.enable}clear(){let e=this.container.actualOptions,t=e.particles.move.trail,n=this._trailFill;e.backgroundMask.enable?this.paint():t.enable&&t.length>0&&n?n.color?this._paintBase(ri(n.color,n.opacity)):n.image&&this._paintImage(n.image,n.opacity):e.clear&&this.draw(r=>{yc(r,this.size)})}destroy(){this.stop(),this._generated?this.element?.remove():this._resetOriginalStyle(),this._preDrawUpdaters=[],this._postDrawUpdaters=[],this._resizePlugins=[],this._colorPlugins=[]}draw(e){let t=this._context;if(t)return e(t)}drawAsync(e){let t=this._context;if(t)return e(t)}drawParticle(e,t){if(e.spawning||e.destroyed)return;let n=e.getRadius();if(n<=0)return;let r=e.getFillColor(),o=e.getStrokeColor()??r,[a,l]=this._getPluginParticleColors(e);a||(a=r),l||(l=o),!(!a&&!l)&&this.draw(c=>{let u=this.container,h=u.actualOptions,f=e.options.zIndex,p=1,g=p-e.zIndexFactor,x=g**f.opacityRate,m=1,d=e.bubble.opacity??e.opacity?.value??m,v=e.strokeOpacity??d,M=d*x,y=v*x,A={},T={fill:a?as(a,M):void 0};T.stroke=l?as(l,y):T.fill,this._applyPreDrawUpdaters(c,e,n,M,T,A),xv({container:u,context:c,particle:e,delta:t,colorStyles:T,backgroundMask:h.backgroundMask.enable,composite:h.backgroundMask.composite,radius:n*g**f.sizeRate,opacity:M,shadow:e.options.shadow,transform:A}),this._applyPostDrawUpdaters(e)})}drawParticlePlugin(e,t,n){this.draw(s=>vv(s,e,t,n))}drawPlugin(e,t){this.draw(n=>yv(n,e,t))}async init(){this._safeMutationObserver(e=>e.disconnect()),this._mutationObserver=cv(e=>{for(let t of e)t.type==="attributes"&&t.attributeName==="style"&&this._repairStyle()}),this.resize(),this._initStyle(),await this._initCover();try{await this._initTrail()}catch(e){Ai().error(e)}this.initBackground(),this._safeMutationObserver(e=>{!this.element||!(this.element instanceof Node)||e.observe(this.element,{attributes:!0})}),this.initUpdaters(),this.initPlugins(),this.paint()}initBackground(){let e=this.container.actualOptions,t=e.background,n=this.element;if(!n)return;let s=n.style;if(s){if(t.color){let r=jt(this._engine,t.color);s.backgroundColor=r?ri(r,t.opacity):""}else s.backgroundColor="";s.backgroundImage=t.image||"",s.backgroundPosition=t.position||"",s.backgroundRepeat=t.repeat||"",s.backgroundSize=t.size||""}}initPlugins(){this._resizePlugins=[];for(let e of this.container.plugins.values())e.resize&&this._resizePlugins.push(e),(e.particleFillColor??e.particleStrokeColor)&&this._colorPlugins.push(e)}initUpdaters(){this._preDrawUpdaters=[],this._postDrawUpdaters=[];for(let e of this.container.particles.updaters)e.afterDraw&&this._postDrawUpdaters.push(e),(e.getColorStyles??e.getTransformValues??e.beforeDraw)&&this._preDrawUpdaters.push(e)}loadCanvas(e){this._generated&&this.element&&this.element.remove(),this._generated=e.dataset&&En in e.dataset?e.dataset[En]==="true":this._generated,this.element=e,this.element.ariaHidden="true",this._originalStyle=nt({},this.element.style);let t=this._standardSize;t.height=e.offsetHeight,t.width=e.offsetWidth;let n=this.container.retina.pixelRatio,s=this.size;e.height=s.height=t.height*n,e.width=s.width=t.width*n,this._context=this.element.getContext("2d"),this._safeMutationObserver(r=>{!this.element||!(this.element instanceof Node)||r.observe(this.element,{attributes:!0})}),this.container.retina.init(),this.initBackground()}paint(){let e=this.container.actualOptions;this.draw(t=>{e.backgroundMask.enable&&e.backgroundMask.cover?(yc(t,this.size),this._coverImage?this._paintImage(this._coverImage.image,this._coverImage.opacity):this._coverColorStyle?this._paintBase(this._coverColorStyle):this._paintBase()):this._paintBase()})}resize(){if(!this.element)return!1;let e=this.container,t=e.canvas._standardSize,n={width:this.element.offsetWidth,height:this.element.offsetHeight},s=e.retina.pixelRatio,r={width:n.width*s,height:n.height*s};if(n.height===t.height&&n.width===t.width&&r.height===this.element.height&&r.width===this.element.width)return!1;let o={...t};t.height=n.height,t.width=n.width;let a=this.size;return this.element.width=a.width=r.width,this.element.height=a.height=r.height,this.container.started&&e.particles.setResizeFactor({width:t.width/o.width,height:t.height/o.height}),!0}stop(){this._safeMutationObserver(e=>e.disconnect()),this._mutationObserver=void 0,this.draw(e=>yc(e,this.size))}async windowResize(){if(!this.element||!this.resize())return;let e=this.container,t=e.updateActualOptions();e.particles.setDensity(),this._applyResizePlugins(),t&&await e.refresh()}};var cs;(function(i){i.canvas="canvas",i.parent="parent",i.window="window"})(cs||(cs={}));var Mv=2;function Ci(i,e,t,n,s){if(n){let r={passive:!0};nc(s)?r.capture=s:s!==void 0&&(r=s),i.addEventListener(e,t,r)}else{let r=s;i.removeEventListener(e,t,r)}}var _c=class{constructor(e){this.container=e,this._doMouseTouchClick=t=>{let n=this.container,s=n.actualOptions;if(this._canPush){let r=n.interactivity.mouse,o=r.position;if(!o)return;r.clickPosition={...o},r.clickTime=new Date().getTime();let a=s.interactivity.events.onClick;Ct(a.mode,l=>this.container.handleClickMode(l))}t.type==="touchend"&&setTimeout(()=>this._mouseTouchFinish(),500)},this._handleThemeChange=t=>{let n=t,s=this.container,r=s.options,o=r.defaultThemes,a=n.matches?o.dark:o.light;r.themes.find(c=>c.name===a)?.default.auto&&s.loadTheme(a)},this._handleVisibilityChange=()=>{let t=this.container,n=t.actualOptions;this._mouseTouchFinish(),n.pauseOnBlur&&(document?.hidden?(t.pageHidden=!0,t.pause()):(t.pageHidden=!1,t.animationStatus?t.play(!0):t.draw(!0)))},this._handleWindowResize=()=>{this._resizeTimeout&&(clearTimeout(this._resizeTimeout),delete this._resizeTimeout);let t=async()=>{await this.container.canvas?.windowResize()};this._resizeTimeout=setTimeout(()=>{t()},this.container.actualOptions.interactivity.events.resize.delay*1e3)},this._manageInteractivityListeners=(t,n)=>{let s=this._handlers,r=this.container,o=r.actualOptions,a=r.interactivity.element;if(!a)return;let l=a,c=r.canvas.element;c&&(c.style.pointerEvents=l===c?"initial":"none"),(o.interactivity.events.onHover.enable||o.interactivity.events.onClick.enable)&&(Ci(a,mi,s.mouseMove,n),Ci(a,$y,s.touchStart,n),Ci(a,Zy,s.touchMove,n),o.interactivity.events.onClick.enable?(Ci(a,Ap,s.touchEndClick,n),Ci(a,qy,s.mouseUp,n),Ci(a,Xy,s.mouseDown,n)):Ci(a,Ap,s.touchEnd,n),Ci(a,t,s.mouseLeave,n),Ci(a,Ky,s.touchCancel,n))},this._manageListeners=t=>{let n=this._handlers,s=this.container,r=s.actualOptions,o=r.interactivity.detectsOn,a=s.canvas.element,l=Yo;o===cs.window?(s.interactivity.element=window,l=Yy):o===cs.parent&&a?s.interactivity.element=a.parentElement??a.parentNode:s.interactivity.element=a,this._manageMediaMatch(t),this._manageResize(t),this._manageInteractivityListeners(l,t),document&&Ci(document,jy,n.visibilityChange,t,!1)},this._manageMediaMatch=t=>{let n=this._handlers,s=oc("(prefers-color-scheme: dark)");if(s){if(s.addEventListener!==void 0){Ci(s,"change",n.themeChange,t);return}s.addListener!==void 0&&(t?s.addListener(n.oldThemeChange):s.removeListener(n.oldThemeChange))}},this._manageResize=t=>{let n=this._handlers,s=this.container;if(!s.actualOptions.interactivity.events.resize)return;if(typeof ResizeObserver>"u"){Ci(window,Jy,n.resize,t);return}let o=s.canvas.element;this._resizeObserver&&!t?(o&&this._resizeObserver.unobserve(o),this._resizeObserver.disconnect(),delete this._resizeObserver):!this._resizeObserver&&t&&o&&(this._resizeObserver=new ResizeObserver(a=>{a.find(c=>c.target===o)&&this._handleWindowResize()}),this._resizeObserver.observe(o))},this._mouseDown=()=>{let{interactivity:t}=this.container;if(!t)return;let{mouse:n}=t;n.clicking=!0,n.downPosition=n.position},this._mouseTouchClick=t=>{let n=this.container,s=n.actualOptions,{mouse:r}=n.interactivity;r.inside=!0;let o=!1,a=r.position;if(!(!a||!s.interactivity.events.onClick.enable)){for(let l of n.plugins.values())if(l.clickPositionValid&&(o=l.clickPositionValid(a),o))break;o||this._doMouseTouchClick(t),r.clicking=!1}},this._mouseTouchFinish=()=>{let t=this.container.interactivity;if(!t)return;let n=t.mouse;delete n.position,delete n.clickPosition,delete n.downPosition,t.status=Yo,n.inside=!1,n.clicking=!1},this._mouseTouchMove=t=>{let n=this.container,s=n.actualOptions,r=n.interactivity,o=n.canvas.element;if(!r?.element)return;r.mouse.inside=!0;let a;if(t.type.startsWith("pointer")){this._canPush=!0;let c=t;if(r.element===window){if(o){let u=o.getBoundingClientRect();a={x:c.clientX-u.left,y:c.clientY-u.top}}}else if(s.interactivity.detectsOn===cs.parent){let u=c.target,h=c.currentTarget;if(u&&h&&o){let f=u.getBoundingClientRect(),p=h.getBoundingClientRect(),g=o.getBoundingClientRect();a={x:c.offsetX+Mv*f.left-(p.left+g.left),y:c.offsetY+Mv*f.top-(p.top+g.top)}}else a={x:c.offsetX??c.clientX,y:c.offsetY??c.clientY}}else c.target===o&&(a={x:c.offsetX??c.clientX,y:c.offsetY??c.clientY})}else if(this._canPush=t.type!=="touchmove",o){let c=t,u=1,h=c.touches[c.touches.length-u],f=o.getBoundingClientRect(),p=0;a={x:h.clientX-(f.left??p),y:h.clientY-(f.top??p)}}let l=n.retina.pixelRatio;a&&(a.x*=l,a.y*=l),r.mouse.position=a,r.status=mi},this._touchEnd=t=>{let n=t,s=Array.from(n.changedTouches);for(let r of s)this._touches.delete(r.identifier);this._mouseTouchFinish()},this._touchEndClick=t=>{let n=t,s=Array.from(n.changedTouches);for(let r of s)this._touches.delete(r.identifier);this._mouseTouchClick(t)},this._touchStart=t=>{let n=t,s=Array.from(n.changedTouches);for(let r of s)this._touches.set(r.identifier,performance.now());this._mouseTouchMove(t)},this._canPush=!0,this._touches=new Map,this._handlers={mouseDown:()=>this._mouseDown(),mouseLeave:()=>this._mouseTouchFinish(),mouseMove:t=>this._mouseTouchMove(t),mouseUp:t=>this._mouseTouchClick(t),touchStart:t=>this._touchStart(t),touchMove:t=>this._mouseTouchMove(t),touchEnd:t=>this._touchEnd(t),touchCancel:t=>this._touchEnd(t),touchEndClick:t=>this._touchEndClick(t),visibilityChange:()=>this._handleVisibilityChange(),themeChange:t=>this._handleThemeChange(t),oldThemeChange:t=>this._handleThemeChange(t),resize:()=>{this._handleWindowResize()}}}addListeners(){this._manageListeners(!0)}removeListeners(){this._manageListeners(!1)}};var Ut;(function(i){i.configAdded="configAdded",i.containerInit="containerInit",i.particlesSetup="particlesSetup",i.containerStarted="containerStarted",i.containerStopped="containerStopped",i.containerDestroyed="containerDestroyed",i.containerPaused="containerPaused",i.containerPlay="containerPlay",i.containerBuilt="containerBuilt",i.particleAdded="particleAdded",i.particleDestroyed="particleDestroyed",i.particleRemoved="particleRemoved"})(Ut||(Ut={}));var ot=class i{constructor(){this.value=""}static create(e,t){let n=new i;return n.load(e),t!==void 0&&(wi(t)||Kt(t)?n.load({value:t}):n.load(t)),n}load(e){N(e)||N(e.value)||(this.value=e.value)}};var bc=class{constructor(){this.color=new ot,this.color.value="",this.image="",this.position="",this.repeat="",this.size="",this.opacity=1}load(e){N(e)||(e.color!==void 0&&(this.color=ot.create(this.color,e.color)),e.image!==void 0&&(this.image=e.image),e.position!==void 0&&(this.position=e.position),e.repeat!==void 0&&(this.repeat=e.repeat),e.size!==void 0&&(this.size=e.size),e.opacity!==void 0&&(this.opacity=e.opacity))}};var Mc=class{constructor(){this.opacity=1}load(e){N(e)||(e.color!==void 0&&(this.color=ot.create(this.color,e.color)),e.image!==void 0&&(this.image=e.image),e.opacity!==void 0&&(this.opacity=e.opacity))}};var Sc=class{constructor(){this.composite="destination-out",this.cover=new Mc,this.enable=!1}load(e){if(!N(e)){if(e.composite!==void 0&&(this.composite=e.composite),e.cover!==void 0){let t=e.cover,n=wi(e.cover)?{color:e.cover}:e.cover;this.cover.load(t.color!==void 0||t.image!==void 0?t:{color:n})}e.enable!==void 0&&(this.enable=e.enable)}}};var wc=class{constructor(){this.enable=!0,this.zIndex=0}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.zIndex!==void 0&&(this.zIndex=e.zIndex))}};var Tc=class{constructor(){this.enable=!1,this.mode=[]}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.mode!==void 0&&(this.mode=e.mode))}};var tn;(function(i){i.circle="circle",i.rectangle="rectangle"})(tn||(tn={}));var Jo=class{constructor(){this.selectors=[],this.enable=!1,this.mode=[],this.type=tn.circle}load(e){N(e)||(e.selectors!==void 0&&(this.selectors=e.selectors),e.enable!==void 0&&(this.enable=e.enable),e.mode!==void 0&&(this.mode=e.mode),e.type!==void 0&&(this.type=e.type))}};var Ec=class{constructor(){this.enable=!1,this.force=2,this.smooth=10}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.force!==void 0&&(this.force=e.force),e.smooth!==void 0&&(this.smooth=e.smooth))}};var Ac=class{constructor(){this.enable=!1,this.mode=[],this.parallax=new Ec}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.mode!==void 0&&(this.mode=e.mode),this.parallax.load(e.parallax))}};var Cc=class{constructor(){this.delay=.5,this.enable=!0}load(e){N(e)||(e.delay!==void 0&&(this.delay=e.delay),e.enable!==void 0&&(this.enable=e.enable))}};var Rc=class{constructor(){this.onClick=new Tc,this.onDiv=new Jo,this.onHover=new Ac,this.resize=new Cc}load(e){if(N(e))return;this.onClick.load(e.onClick);let t=e.onDiv;t!==void 0&&(this.onDiv=Ct(t,n=>{let s=new Jo;return s.load(n),s})),this.onHover.load(e.onHover),this.resize.load(e.resize)}};var Pc=class{constructor(e,t){this._engine=e,this._container=t}load(e){if(N(e)||!this._container)return;let t=this._engine.interactors.get(this._container);if(t)for(let n of t)n.loadModeOptions&&n.loadModeOptions(this,e)}};var to=class{constructor(e,t){this.detectsOn=cs.window,this.events=new Rc,this.modes=new Pc(e,t)}load(e){if(N(e))return;let t=e.detectsOn;t!==void 0&&(this.detectsOn=t),this.events.load(e.events),this.modes.load(e.modes)}};var Sv=50,Ic=class{load(e){N(e)||(e.position&&(this.position={x:e.position.x??Sv,y:e.position.y??Sv,mode:e.position.mode??Qi.percent}),e.options&&(this.options=nt({},e.options)))}};var Pn;(function(i){i.screen="screen",i.canvas="canvas"})(Pn||(Pn={}));var Dc=class{constructor(){this.maxWidth=1/0,this.options={},this.mode=Pn.canvas}load(e){N(e)||(N(e.maxWidth)||(this.maxWidth=e.maxWidth),N(e.mode)||(e.mode===Pn.screen?this.mode=Pn.screen:this.mode=Pn.canvas),N(e.options)||(this.options=nt({},e.options)))}};var nn;(function(i){i.any="any",i.dark="dark",i.light="light"})(nn||(nn={}));var Lc=class{constructor(){this.auto=!1,this.mode=nn.any,this.value=!1}load(e){N(e)||(e.auto!==void 0&&(this.auto=e.auto),e.mode!==void 0&&(this.mode=e.mode),e.value!==void 0&&(this.value=e.value))}};var Oc=class{constructor(){this.name="",this.default=new Lc}load(e){N(e)||(e.name!==void 0&&(this.name=e.name),this.default.load(e.default),e.options!==void 0&&(this.options=nt({},e.options)))}};var Ns=class{constructor(){this.count=0,this.enable=!1,this.speed=1,this.decay=0,this.delay=0,this.sync=!1}load(e){N(e)||(e.count!==void 0&&(this.count=Ae(e.count)),e.enable!==void 0&&(this.enable=e.enable),e.speed!==void 0&&(this.speed=Ae(e.speed)),e.decay!==void 0&&(this.decay=Ae(e.decay)),e.delay!==void 0&&(this.delay=Ae(e.delay)),e.sync!==void 0&&(this.sync=e.sync))}},us=class extends Ns{constructor(){super(),this.mode=Cn.auto,this.startValue=rs.random}load(e){super.load(e),!N(e)&&(e.mode!==void 0&&(this.mode=e.mode),e.startValue!==void 0&&(this.startValue=e.startValue))}};var io=class extends Ns{constructor(){super(),this.offset=0,this.sync=!0}load(e){super.load(e),!N(e)&&e.offset!==void 0&&(this.offset=Ae(e.offset))}};var Uc=class{constructor(){this.h=new io,this.s=new io,this.l=new io}load(e){N(e)||(this.h.load(e.h),this.s.load(e.s),this.l.load(e.l))}};var Fs=class i extends ot{constructor(){super(),this.animation=new Uc}static create(e,t){let n=new i;return n.load(e),t!==void 0&&(wi(t)||Kt(t)?n.load({value:t}):n.load(t)),n}load(e){if(super.load(e),N(e))return;let t=e.animation;t!==void 0&&(t.enable!==void 0?this.animation.h.load(t):this.animation.load(e.animation))}};var hs;(function(i){i.absorb="absorb",i.bounce="bounce",i.destroy="destroy"})(hs||(hs={}));var Nc=class{constructor(){this.speed=2}load(e){N(e)||e.speed!==void 0&&(this.speed=e.speed)}};var Fc=class{constructor(){this.enable=!0,this.retries=0}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.retries!==void 0&&(this.retries=e.retries))}};var Qt=class{constructor(){this.value=0}load(e){N(e)||N(e.value)||(this.value=Ae(e.value))}},Op=class extends Qt{constructor(){super(),this.animation=new Ns}load(e){if(super.load(e),N(e))return;let t=e.animation;t!==void 0&&this.animation.load(t)}},no=class extends Op{constructor(){super(),this.animation=new us}load(e){super.load(e)}};var jo=class extends Qt{constructor(){super(),this.value=1}};var so=class{constructor(){this.horizontal=new jo,this.vertical=new jo}load(e){N(e)||(this.horizontal.load(e.horizontal),this.vertical.load(e.vertical))}};var Bc=class{constructor(){this.absorb=new Nc,this.bounce=new so,this.enable=!1,this.maxSpeed=50,this.mode=hs.bounce,this.overlap=new Fc}load(e){N(e)||(this.absorb.load(e.absorb),this.bounce.load(e.bounce),e.enable!==void 0&&(this.enable=e.enable),e.maxSpeed!==void 0&&(this.maxSpeed=Ae(e.maxSpeed)),e.mode!==void 0&&(this.mode=e.mode),this.overlap.load(e.overlap))}};var zc=class{constructor(){this.close=!0,this.fill=!0,this.options={},this.type=[]}load(e){if(N(e))return;let t=e.options;if(t!==void 0)for(let n in t){let s=t[n];s&&(this.options[n]=nt(this.options[n]??{},s))}e.close!==void 0&&(this.close=e.close),e.fill!==void 0&&(this.fill=e.fill),e.type!==void 0&&(this.type=e.type)}};var kc=class{constructor(){this.offset=0,this.value=90}load(e){N(e)||(e.offset!==void 0&&(this.offset=Ae(e.offset)),e.value!==void 0&&(this.value=Ae(e.value)))}};var Vc=class{constructor(){this.distance=200,this.enable=!1,this.rotate={x:3e3,y:3e3}}load(e){if(!N(e)&&(e.distance!==void 0&&(this.distance=Ae(e.distance)),e.enable!==void 0&&(this.enable=e.enable),e.rotate)){let t=e.rotate.x;t!==void 0&&(this.rotate.x=t);let n=e.rotate.y;n!==void 0&&(this.rotate.y=n)}}};var Hc=class{constructor(){this.x=50,this.y=50,this.mode=Qi.percent,this.radius=0}load(e){N(e)||(e.x!==void 0&&(this.x=e.x),e.y!==void 0&&(this.y=e.y),e.mode!==void 0&&(this.mode=e.mode),e.radius!==void 0&&(this.radius=e.radius))}};var Gc=class{constructor(){this.acceleration=9.81,this.enable=!1,this.inverse=!1,this.maxSpeed=50}load(e){N(e)||(e.acceleration!==void 0&&(this.acceleration=Ae(e.acceleration)),e.enable!==void 0&&(this.enable=e.enable),e.inverse!==void 0&&(this.inverse=e.inverse),e.maxSpeed!==void 0&&(this.maxSpeed=Ae(e.maxSpeed)))}};var Wc=class{constructor(){this.clamp=!0,this.delay=new Qt,this.enable=!1,this.options={}}load(e){N(e)||(e.clamp!==void 0&&(this.clamp=e.clamp),this.delay.load(e.delay),e.enable!==void 0&&(this.enable=e.enable),this.generator=e.generator,e.options&&(this.options=nt(this.options,e.options)))}};var Xc=class{load(e){N(e)||(e.color!==void 0&&(this.color=ot.create(this.color,e.color)),e.image!==void 0&&(this.image=e.image))}};var qc=class{constructor(){this.enable=!1,this.length=10,this.fill=new Xc}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.fill!==void 0&&this.fill.load(e.fill),e.length!==void 0&&(this.length=e.length))}};var it;(function(i){i.bounce="bounce",i.none="none",i.out="out",i.destroy="destroy",i.split="split"})(it||(it={}));var Yc=class{constructor(){this.default=it.out}load(e){N(e)||(e.default!==void 0&&(this.default=e.default),this.bottom=e.bottom??e.default,this.left=e.left??e.default,this.right=e.right??e.default,this.top=e.top??e.default)}};var $c=class{constructor(){this.acceleration=0,this.enable=!1}load(e){N(e)||(e.acceleration!==void 0&&(this.acceleration=Ae(e.acceleration)),e.enable!==void 0&&(this.enable=e.enable),e.position&&(this.position=nt({},e.position)))}};var Zc=class{constructor(){this.angle=new kc,this.attract=new Vc,this.center=new Hc,this.decay=0,this.distance={},this.direction=Dt.none,this.drift=0,this.enable=!1,this.gravity=new Gc,this.path=new Wc,this.outModes=new Yc,this.random=!1,this.size=!1,this.speed=2,this.spin=new $c,this.straight=!1,this.trail=new qc,this.vibrate=!1,this.warp=!1}load(e){if(N(e))return;this.angle.load(ki(e.angle)?{value:e.angle}:e.angle),this.attract.load(e.attract),this.center.load(e.center),e.decay!==void 0&&(this.decay=Ae(e.decay)),e.direction!==void 0&&(this.direction=e.direction),e.distance!==void 0&&(this.distance=ki(e.distance)?{horizontal:e.distance,vertical:e.distance}:{...e.distance}),e.drift!==void 0&&(this.drift=Ae(e.drift)),e.enable!==void 0&&(this.enable=e.enable),this.gravity.load(e.gravity);let t=e.outModes;t!==void 0&&(An(t)?this.outModes.load(t):this.outModes.load({default:t})),this.path.load(e.path),e.random!==void 0&&(this.random=e.random),e.size!==void 0&&(this.size=e.size),e.speed!==void 0&&(this.speed=Ae(e.speed)),this.spin.load(e.spin),e.straight!==void 0&&(this.straight=e.straight),this.trail.load(e.trail),e.vibrate!==void 0&&(this.vibrate=e.vibrate),e.warp!==void 0&&(this.warp=e.warp)}};var Kc=class extends us{constructor(){super(),this.destroy=Vi.none,this.speed=2}load(e){super.load(e),!N(e)&&e.destroy!==void 0&&(this.destroy=e.destroy)}};var Jc=class extends no{constructor(){super(),this.animation=new Kc,this.value=1}load(e){if(N(e))return;super.load(e);let t=e.animation;t!==void 0&&this.animation.load(t)}};var jc=class{constructor(){this.enable=!1,this.width=1920,this.height=1080}load(e){if(N(e))return;e.enable!==void 0&&(this.enable=e.enable);let t=e.width;t!==void 0&&(this.width=t);let n=e.height;n!==void 0&&(this.height=n)}};var Bs;(function(i){i.delete="delete",i.wait="wait"})(Bs||(Bs={}));var Qc=class{constructor(){this.mode=Bs.delete,this.value=0}load(e){N(e)||(e.mode!==void 0&&(this.mode=e.mode),e.value!==void 0&&(this.value=e.value))}};var eu=class{constructor(){this.density=new jc,this.limit=new Qc,this.value=0}load(e){N(e)||(this.density.load(e.density),this.limit.load(e.limit),e.value!==void 0&&(this.value=e.value))}};var tu=class{constructor(){this.blur=0,this.color=new ot,this.enable=!1,this.offset={x:0,y:0},this.color.value="#000"}load(e){N(e)||(e.blur!==void 0&&(this.blur=e.blur),this.color=ot.create(this.color,e.color),e.enable!==void 0&&(this.enable=e.enable),e.offset!==void 0&&(e.offset.x!==void 0&&(this.offset.x=e.offset.x),e.offset.y!==void 0&&(this.offset.y=e.offset.y)))}};var iu=class{constructor(){this.close=!0,this.fill=!0,this.options={},this.type="circle"}load(e){if(N(e))return;let t=e.options;if(t!==void 0)for(let n in t){let s=t[n];s&&(this.options[n]=nt(this.options[n]??{},s))}e.close!==void 0&&(this.close=e.close),e.fill!==void 0&&(this.fill=e.fill),e.type!==void 0&&(this.type=e.type)}};var nu=class extends us{constructor(){super(),this.destroy=Vi.none,this.speed=5}load(e){super.load(e),!N(e)&&e.destroy!==void 0&&(this.destroy=e.destroy)}};var su=class extends no{constructor(){super(),this.animation=new nu,this.value=3}load(e){if(super.load(e),N(e))return;let t=e.animation;t!==void 0&&this.animation.load(t)}};var Qo=class{constructor(){this.width=0}load(e){N(e)||(e.color!==void 0&&(this.color=Fs.create(this.color,e.color)),e.width!==void 0&&(this.width=Ae(e.width)),e.opacity!==void 0&&(this.opacity=Ae(e.opacity)))}};var ru=class extends Qt{constructor(){super(),this.opacityRate=1,this.sizeRate=1,this.velocityRate=1}load(e){super.load(e),!N(e)&&(e.opacityRate!==void 0&&(this.opacityRate=e.opacityRate),e.sizeRate!==void 0&&(this.sizeRate=e.sizeRate),e.velocityRate!==void 0&&(this.velocityRate=e.velocityRate))}};var ou=class{constructor(e,t){this._engine=e,this._container=t,this.bounce=new so,this.collisions=new Bc,this.color=new Fs,this.color.value="#fff",this.effect=new zc,this.groups={},this.move=new Zc,this.number=new eu,this.opacity=new Jc,this.reduceDuplicates=!1,this.shadow=new tu,this.shape=new iu,this.size=new su,this.stroke=new Qo,this.zIndex=new ru}load(e){if(N(e))return;if(e.groups!==void 0)for(let n of Object.keys(e.groups)){if(!Object.hasOwn(e.groups,n))continue;let s=e.groups[n];s!==void 0&&(this.groups[n]=nt(this.groups[n]??{},s))}e.reduceDuplicates!==void 0&&(this.reduceDuplicates=e.reduceDuplicates),this.bounce.load(e.bounce),this.color.load(Fs.create(this.color,e.color)),this.effect.load(e.effect),this.move.load(e.move),this.number.load(e.number),this.opacity.load(e.opacity),this.shape.load(e.shape),this.size.load(e.size),this.shadow.load(e.shadow),this.zIndex.load(e.zIndex),this.collisions.load(e.collisions),e.interactivity!==void 0&&(this.interactivity=nt({},e.interactivity));let t=e.stroke;if(t&&(this.stroke=Ct(t,n=>{let s=new Qo;return s.load(n),s})),this._container){let n=this._engine.updaters.get(this._container);if(n)for(let r of n)r.loadOptions&&r.loadOptions(this,e);let s=this._engine.interactors.get(this._container);if(s)for(let r of s)r.loadParticlesOptions&&r.loadParticlesOptions(this,e)}}};function Up(i,...e){for(let t of e)i.load(t)}function au(i,e,...t){let n=new ou(i,e);return Up(n,...t),n}var lu=class{constructor(e,t){this._findDefaultTheme=n=>this.themes.find(s=>s.default.value&&s.default.mode===n)??this.themes.find(s=>s.default.value&&s.default.mode===nn.any),this._importPreset=n=>{this.load(this._engine.getPreset(n))},this._engine=e,this._container=t,this.autoPlay=!0,this.background=new bc,this.backgroundMask=new Sc,this.clear=!0,this.defaultThemes={},this.delay=0,this.fullScreen=new wc,this.detectRetina=!0,this.duration=0,this.fpsLimit=120,this.interactivity=new to(e,t),this.manualParticles=[],this.particles=au(this._engine,this._container),this.pauseOnBlur=!0,this.pauseOnOutsideViewport=!0,this.responsive=[],this.smooth=!1,this.style={},this.themes=[],this.zLayers=100}load(e){if(N(e))return;e.preset!==void 0&&Ct(e.preset,o=>this._importPreset(o)),e.autoPlay!==void 0&&(this.autoPlay=e.autoPlay),e.clear!==void 0&&(this.clear=e.clear),e.key!==void 0&&(this.key=e.key),e.name!==void 0&&(this.name=e.name),e.delay!==void 0&&(this.delay=Ae(e.delay));let t=e.detectRetina;t!==void 0&&(this.detectRetina=t),e.duration!==void 0&&(this.duration=Ae(e.duration));let n=e.fpsLimit;n!==void 0&&(this.fpsLimit=n),e.pauseOnBlur!==void 0&&(this.pauseOnBlur=e.pauseOnBlur),e.pauseOnOutsideViewport!==void 0&&(this.pauseOnOutsideViewport=e.pauseOnOutsideViewport),e.zLayers!==void 0&&(this.zLayers=e.zLayers),this.background.load(e.background);let s=e.fullScreen;nc(s)?this.fullScreen.enable=s:this.fullScreen.load(s),this.backgroundMask.load(e.backgroundMask),this.interactivity.load(e.interactivity),e.manualParticles&&(this.manualParticles=e.manualParticles.map(o=>{let a=new Ic;return a.load(o),a})),this.particles.load(e.particles),this.style=nt(this.style,e.style),this._engine.loadOptions(this,e),e.smooth!==void 0&&(this.smooth=e.smooth);let r=this._engine.interactors.get(this._container);if(r)for(let o of r)o.loadOptions&&o.loadOptions(this,e);if(e.responsive!==void 0)for(let o of e.responsive){let a=new Dc;a.load(o),this.responsive.push(a)}if(this.responsive.sort((o,a)=>o.maxWidth-a.maxWidth),e.themes!==void 0)for(let o of e.themes){let a=this.themes.find(l=>l.name===o.name);if(a)a.load(o);else{let l=new Oc;l.load(o),this.themes.push(l)}}this.defaultThemes.dark=this._findDefaultTheme(nn.dark)?.name,this.defaultThemes.light=this._findDefaultTheme(nn.light)?.name}setResponsive(e,t,n){this.load(n);let s=this.responsive.find(r=>r.mode===Pn.screen&&screen?r.maxWidth>screen.availWidth:r.maxWidth*t>e);return this.load(s?.options),s?.maxWidth}setTheme(e){if(e){let t=this.themes.find(n=>n.name===e);t&&this.load(t.options)}else{let t=oc("(prefers-color-scheme: dark)"),n=t?.matches,s=this._findDefaultTheme(n?nn.dark:nn.light);s&&this.load(s.options)}}};var In;(function(i){i.external="external",i.particles="particles"})(In||(In={}));var cu=class{constructor(e,t){this.container=t,this._engine=e,this._interactors=[],this._externalInteractors=[],this._particleInteractors=[]}externalInteract(e){for(let t of this._externalInteractors)t.isEnabled()&&t.interact(e)}handleClickMode(e){for(let t of this._externalInteractors)t.handleClickMode?.(e)}async init(){this._interactors=await this._engine.getInteractors(this.container,!0),this._externalInteractors=[],this._particleInteractors=[];for(let e of this._interactors){switch(e.type){case In.external:this._externalInteractors.push(e);break;case In.particles:this._particleInteractors.push(e);break}e.init()}}particlesInteract(e,t){for(let n of this._externalInteractors)n.clear(e,t);for(let n of this._particleInteractors)n.isEnabled(e)&&n.interact(e,t)}reset(e){for(let t of this._externalInteractors)t.isEnabled()&&t.reset(e);for(let t of this._particleInteractors)t.isEnabled(e)&&t.reset(e)}};var oi;(function(i){i.normal="normal",i.inside="inside",i.outside="outside"})(oi||(oi={}));var wv=0,Np=2,uu=.5,V1=2,Tv="random";function H1(i,e,t,n){let s=e.options[i];if(s)return nt({close:e.close,fill:e.fill},Xt(s,t,n))}function G1(i,e,t,n){let s=e.options[i];if(s)return nt({close:e.close,fill:e.fill},Xt(s,t,n))}function Ev(i){if(!Qe(i.outMode,i.checkModes))return;let e=i.radius*Np;i.coord>i.maxCoord-e?i.setCb(-i.radius):i.coord<e&&i.setCb(i.radius)}var hu=class{constructor(e,t){this.container=t,this._calcPosition=(n,s,r,o=wv)=>{for(let g of n.plugins.values()){let x=g.particlePosition!==void 0?g.particlePosition(s,this):void 0;if(x)return Yr.create(x.x,x.y,r)}let a=n.canvas.size,l=rv({size:a,position:s}),c=Yr.create(l.x,l.y,r),u=this.getRadius(),h=this.options.move.outModes,f=g=>{Ev({outMode:g,checkModes:[it.bounce],coord:c.x,maxCoord:n.canvas.size.width,setCb:x=>c.x+=x,radius:u})},p=g=>{Ev({outMode:g,checkModes:[it.bounce],coord:c.y,maxCoord:n.canvas.size.height,setCb:x=>c.y+=x,radius:u})};return f(h.left??h.default),f(h.right??h.default),p(h.top??h.default),p(h.bottom??h.default),this._checkOverlap(c,o)?this._calcPosition(n,void 0,r,o+1):c},this._calculateVelocity=()=>{let n=sv(this.direction),s=n.copy(),r=this.options.move;if(r.direction===Dt.inside||r.direction===Dt.outside)return s;let o=Ei(ie(r.angle.value)),a=Ei(ie(r.angle.offset)),l={left:a-o*uu,right:a+o*uu};return r.straight||(s.angle+=Bt(Ae(l.left,l.right))),r.random&&typeof r.speed=="number"&&(s.length*=ke()),s},this._checkOverlap=(n,s=wv)=>{let r=this.options.collisions,o=this.getRadius();if(!r.enable)return!1;let a=r.overlap;if(a.enable)return!1;let l=a.retries;if(l>=0&&s>l)throw new Error(`${It} particle is overlapping and can't be placed`);return!!this.container.particles.find(u=>xt(n,u.position)<o+u.getRadius())},this._getRollColor=n=>{if(!n||!this.roll||!this.backColor&&!this.roll.alter)return n;let s=1,r=0,o=this.roll.horizontal&&this.roll.vertical?Np*s:s,a=this.roll.horizontal?Math.PI*uu:r;return Math.floor(((this.roll.angle??r)+a)/(Math.PI/o))%Np?this.backColor?this.backColor:this.roll.alter?_v(n,this.roll.alter.type,this.roll.alter.value):n:n},this._initPosition=n=>{let s=this.container,r=ie(this.options.zIndex.value),o=0;this.position=this._calcPosition(s,n,At(r,o,s.zLayers)),this.initialPosition=this.position.copy();let a=s.canvas.size,l=0;switch(this.moveCenter={...uc(this.options.move.center,a),radius:this.options.move.center.radius??l,mode:this.options.move.center.mode??Qi.percent},this.direction=nv(this.options.move.direction,this.position,this.moveCenter),this.options.move.direction){case Dt.inside:this.outType=oi.inside;break;case Dt.outside:this.outType=oi.outside;break}this.offset=ht.origin},this._engine=e}destroy(e){if(this.unbreakable||this.destroyed)return;this.destroyed=!0,this.bubble.inRange=!1,this.slow.inRange=!1;let t=this.container,n=this.pathGenerator;t.shapeDrawers.get(this.shape)?.particleDestroy?.(this);for(let r of t.plugins.values())r.particleDestroyed?.(this,e);for(let r of t.particles.updaters)r.particleDestroyed?.(this,e);n?.reset(this),this._engine.dispatchEvent(Ut.particleDestroyed,{container:this.container,data:{particle:this}})}draw(e){let t=this.container,n=t.canvas;for(let s of t.plugins.values())n.drawParticlePlugin(s,this,e);n.drawParticle(this,e)}getFillColor(){return this._getRollColor(this.bubble.color??Lp(this.color))}getMass(){return this.getRadius()**V1*Math.PI*uu}getPosition(){return{x:this.position.x+this.offset.x,y:this.position.y+this.offset.y,z:this.position.z}}getRadius(){return this.bubble.radius??this.size.value}getStrokeColor(){return this._getRollColor(this.bubble.color??Lp(this.strokeColor))}init(e,t,n,s){let r=this.container,o=this._engine;this.id=e,this.group=s,this.effectClose=!0,this.effectFill=!0,this.shapeClose=!0,this.shapeFill=!0,this.pathRotation=!1,this.lastPathTime=0,this.destroyed=!1,this.unbreakable=!1,this.isRotating=!1,this.rotation=0,this.misplaced=!1,this.retina={maxDistance:{}},this.outType=oi.normal,this.ignoresResizeRatio=!0;let a=r.retina.pixelRatio,l=r.actualOptions,c=au(this._engine,r,l.particles),{reduceDuplicates:u}=c,h=c.effect.type,f=c.shape.type;this.effect=Xt(h,this.id,u),this.shape=Xt(f,this.id,u);let p=c.effect,g=c.shape;if(n){if(n.effect?.type){let C=n.effect.type,S=Xt(C,this.id,u);S&&(this.effect=S,p.load(n.effect))}if(n.shape?.type){let C=n.shape.type,S=Xt(C,this.id,u);S&&(this.shape=S,g.load(n.shape))}}if(this.effect===Tv){let C=[...this.container.effectDrawers.keys()];this.effect=C[Math.floor(Math.random()*C.length)]}if(this.shape===Tv){let C=[...this.container.shapeDrawers.keys()];this.shape=C[Math.floor(Math.random()*C.length)]}this.effectData=H1(this.effect,p,this.id,u),this.shapeData=G1(this.shape,g,this.id,u),c.load(n);let x=this.effectData;x&&c.load(x.particles);let m=this.shapeData;m&&c.load(m.particles);let d=new to(o,r);d.load(r.actualOptions.interactivity),d.load(c.interactivity),this.interactivity=d,this.effectFill=x?.fill??c.effect.fill,this.effectClose=x?.close??c.effect.close,this.shapeFill=m?.fill??c.shape.fill,this.shapeClose=m?.close??c.shape.close,this.options=c;let v=this.options.move.path;this.pathDelay=ie(v.delay.value)*1e3,v.generator&&(this.pathGenerator=this._engine.getPathGenerator(v.generator),this.pathGenerator&&r.addPath(v.generator,this.pathGenerator)&&this.pathGenerator.init(r)),r.retina.initParticle(this),this.size=cc(this.options.size,a),this.bubble={inRange:!1},this.slow={inRange:!1,factor:1},this._initPosition(t),this.initialVelocity=this._calculateVelocity(),this.velocity=this.initialVelocity.copy();let M=1;this.moveDecay=M-ie(this.options.move.decay);let y=r.particles;y.setLastZIndex(this.position.z),this.zIndexFactor=this.position.z/r.zLayers,this.sides=24;let A=r.effectDrawers.get(this.effect);A||(A=this._engine.getEffectDrawer(this.effect),A&&r.effectDrawers.set(this.effect,A)),A?.loadEffect&&A.loadEffect(this);let T=r.shapeDrawers.get(this.shape);T||(T=this._engine.getShapeDrawer(this.shape),T&&r.shapeDrawers.set(this.shape,T)),T?.loadShape&&T.loadShape(this);let R=T?.getSidesCount;R&&(this.sides=R(this)),this.spawning=!1,this.shadowColor=jt(this._engine,this.options.shadow.color);for(let C of y.updaters)C.init(this);for(let C of y.movers)C.init?.(this);A?.particleInit?.(r,this),T?.particleInit?.(r,this);for(let C of r.plugins.values())C.particleCreated?.(this)}isInsideCanvas(){let e=this.getRadius(),t=this.container.canvas.size,n=this.position;return n.x>=-e&&n.y>=-e&&n.y<=t.height+e&&n.x<=t.width+e}isVisible(){return!this.destroyed&&!this.spawning&&this.isInsideCanvas()}reset(){for(let e of this.container.particles.updaters)e.reset?.(this)}};var fu=class{constructor(e,t){this.position=e,this.particle=t}};var zs;(function(i){i.circle="circle",i.rectangle="rectangle"})(zs||(zs={}));var ea=2,du=class{constructor(e,t,n){this.position={x:e,y:t},this.type=n}},vt=class i extends du{constructor(e,t,n){super(e,t,zs.circle),this.radius=n}contains(e){return xt(e,this.position)<=this.radius}intersects(e){let t=this.position,n=e.position,s={x:Math.abs(n.x-t.x),y:Math.abs(n.y-t.y)},r=this.radius;if(e instanceof i||e.type===zs.circle){let o=e,a=r+o.radius,l=Math.sqrt(s.x**ea+s.y**ea);return a>l}else if(e instanceof zt||e.type===zs.rectangle){let o=e,{width:a,height:l}=o.size;return Math.pow(s.x-a,ea)+Math.pow(s.y-l,ea)<=r**ea||s.x<=r+a&&s.y<=r+l||s.x<=a||s.y<=l}return!1}},zt=class i extends du{constructor(e,t,n,s){super(e,t,zs.rectangle),this.size={height:s,width:n}}contains(e){let t=this.size.width,n=this.size.height,s=this.position;return e.x>=s.x&&e.x<=s.x+t&&e.y>=s.y&&e.y<=s.y+n}intersects(e){if(e instanceof vt)return e.intersects(this);let t=this.size.width,n=this.size.height,s=this.position,r=e.position,o=e instanceof i?e.size:{width:0,height:0},a=o.width,l=o.height;return r.x<s.x+t&&r.x+a>s.x&&r.y<s.y+n&&r.y+l>s.y}};var ta=.5,W1=2,X1=4,ia=class i{constructor(e,t){this.rectangle=e,this.capacity=t,this._subdivide=()=>{let{x:n,y:s}=this.rectangle.position,{width:r,height:o}=this.rectangle.size,{capacity:a}=this;for(let l=0;l<X1;l++){let c=l%W1;this._subs.push(new i(new zt(n+r*ta*c,s+o*ta*(Math.round(l*ta)-c),r*ta,o*ta),a))}this._divided=!0},this._points=[],this._divided=!1,this._subs=[]}insert(e){return this.rectangle.contains(e.position)?this._points.length<this.capacity?(this._points.push(e),!0):(this._divided||this._subdivide(),this._subs.some(t=>t.insert(e))):!1}query(e,t){let n=[];if(!e.intersects(this.rectangle))return[];for(let s of this._points)!e.contains(s.position)&&xt(e.position,s.position)>s.particle.getRadius()&&(!t||t(s.particle))||n.push(s.particle);if(this._divided)for(let s of this._subs)n.push(...s.query(e,t));return n}queryCircle(e,t,n){return this.query(new vt(e.x,e.y,t),n)}queryRectangle(e,t,n){return this.query(new zt(e.x,e.y,t.width,t.height),n)}};var Av=4,q1=2,Y1=1,Cv=i=>{let{height:e,width:t}=i,n=-.25,s=1.5;return new zt(n*t,n*e,s*t,s*e)},pu=class{constructor(e,t){this._addToPool=(...s)=>{this._pool.push(...s)},this._applyDensity=(s,r,o)=>{let a=s.number;if(!s.number.density?.enable){o===void 0?this._limit=a.limit.value:a.limit&&this._groupLimits.set(o,a.limit.value);return}let l=this._initDensityFactor(a.density),c=a.value,u=0,h=a.limit.value>u?a.limit.value:c,f=Math.min(c,h)*l+r,p=Math.min(this.count,this.filter(g=>g.group===o).length);o===void 0?this._limit=a.limit.value*l:this._groupLimits.set(o,a.limit.value*l),p<f?this.push(Math.abs(f-p),void 0,s,o):p>f&&this.removeQuantity(p-f,o)},this._initDensityFactor=s=>{let r=this._container,o=1;if(!r.canvas.element||!s.enable)return o;let a=r.canvas.element,l=r.retina.pixelRatio;return a.width*a.height/(s.height*s.width*l**q1)},this._pushParticle=(s,r,o,a)=>{try{let l=this._pool.pop();l||(l=new hu(this._engine,this._container)),l.init(this._nextId,s,r,o);let c=!0;return a&&(c=a(l)),c?(this._array.push(l),this._zArray.push(l),this._nextId++,this._engine.dispatchEvent(Ut.particleAdded,{container:this._container,data:{particle:l}}),l):void 0}catch(l){Ai().warning(`${It} adding particle: ${l}`)}},this._removeParticle=(s,r,o)=>{let a=this._array[s];if(!a||a.group!==r)return!1;let l=this._zArray.indexOf(a),c=1;return this._array.splice(s,c),this._zArray.splice(l,c),a.destroy(o),this._engine.dispatchEvent(Ut.particleRemoved,{container:this._container,data:{particle:a}}),this._addToPool(a),!0},this._engine=e,this._container=t,this._nextId=0,this._array=[],this._zArray=[],this._pool=[],this._limit=0,this._groupLimits=new Map,this._needsSort=!1,this._lastZIndex=0,this._interactionManager=new cu(e,t),this._pluginsInitialized=!1;let n=t.canvas.size;this.quadTree=new ia(Cv(n),Av),this.movers=[],this.updaters=[]}get count(){return this._array.length}addManualParticles(){let e=this._container;e.actualOptions.manualParticles.forEach(n=>this.addParticle(n.position?uc(n.position,e.canvas.size):void 0,n.options))}addParticle(e,t,n,s){let r=this._container.actualOptions.particles.number.limit.mode,o=n===void 0?this._limit:this._groupLimits.get(n)??this._limit,a=this.count;if(o>0)switch(r){case Bs.delete:{let h=a+1-o;h>0&&this.removeQuantity(h);break}case Bs.wait:if(a>=o)return;break}return this._pushParticle(e,t,n,s)}clear(){this._array=[],this._zArray=[],this._pluginsInitialized=!1}destroy(){this._array=[],this._zArray=[],this.movers=[],this.updaters=[]}draw(e){let t=this._container,n=t.canvas;n.clear(),this.update(e);for(let s of t.plugins.values())n.drawPlugin(s,e);for(let s of this._zArray)s.draw(e)}filter(e){return this._array.filter(e)}find(e){return this._array.find(e)}get(e){return this._array[e]}handleClickMode(e){this._interactionManager.handleClickMode(e)}async init(){let e=this._container,t=e.actualOptions;this._lastZIndex=0,this._needsSort=!1,await this.initPlugins();let n=!1;for(let s of e.plugins.values())if(n=s.particlesInitialization?.()??n,n)break;if(this.addManualParticles(),!n){let s=t.particles,r=s.groups;for(let o in r){let a=r[o];for(let l=this.count,c=0;c<a.number?.value&&l<s.number.value;l++,c++)this.addParticle(void 0,a,o)}for(let o=this.count;o<s.number.value;o++)this.addParticle()}}async initPlugins(){if(this._pluginsInitialized)return;let e=this._container;this.movers=await this._engine.getMovers(e,!0),this.updaters=await this._engine.getUpdaters(e,!0),await this._interactionManager.init();for(let t of e.pathGenerators.values())t.init(e)}push(e,t,n,s){for(let r=0;r<e;r++)this.addParticle(t?.position,n,s)}async redraw(){this.clear(),await this.init(),this.draw({value:0,factor:0})}remove(e,t,n){this.removeAt(this._array.indexOf(e),void 0,t,n)}removeAt(e,t=Y1,n,s){if(e<0||e>this.count)return;let o=0;for(let a=e;o<t&&a<this.count;a++)this._removeParticle(a,n,s)&&(a--,o++)}removeQuantity(e,t){this.removeAt(0,e,t)}setDensity(){let e=this._container.actualOptions,t=e.particles.groups,n=0;for(let s in t)this._applyDensity(t[s],n,s);this._applyDensity(e.particles,e.manualParticles.length)}setLastZIndex(e){this._lastZIndex=e,this._needsSort=this._needsSort||this._lastZIndex<e}setResizeFactor(e){this._resizeFactor=e}update(e){let t=this._container,n=new Set;this.quadTree=new ia(Cv(t.canvas.size),Av);for(let r of t.pathGenerators.values())r.update();for(let r of t.plugins.values())r.update?.(e);let s=this._resizeFactor;for(let r of this._array){s&&!r.ignoresResizeRatio&&(r.position.x*=s.width,r.position.y*=s.height,r.initialPosition.x*=s.width,r.initialPosition.y*=s.height),r.ignoresResizeRatio=!1,this._interactionManager.reset(r);for(let o of this._container.plugins.values()){if(r.destroyed)break;o.particleUpdate?.(r,e)}for(let o of this.movers)o.isEnabled(r)&&o.move(r,e);if(r.destroyed){n.add(r);continue}this.quadTree.insert(new fu(r.getPosition(),r))}if(n.size){let r=o=>!n.has(o);this._array=this.filter(r),this._zArray=this._zArray.filter(r);for(let o of n)this._engine.dispatchEvent(Ut.particleRemoved,{container:this._container,data:{particle:o}});this._addToPool(...n)}this._interactionManager.externalInteract(e);for(let r of this._array){for(let o of this.updaters)o.update(r,e);!r.destroyed&&!r.spawning&&this._interactionManager.particlesInteract(r,e)}if(delete this._resizeFactor,this._needsSort){let r=this._zArray;r.sort((a,l)=>l.position.z-a.position.z||a.id-l.id);let o=1;this._lastZIndex=r[r.length-o].position.z,this._needsSort=!1}}};var Rv=1,Pv=1,mu=class{constructor(e){this.container=e,this.pixelRatio=Rv,this.reduceFactor=Pv}init(){let e=this.container,t=e.actualOptions;this.pixelRatio=!t.detectRetina||en()?Rv:window.devicePixelRatio,this.reduceFactor=Pv;let n=this.pixelRatio,s=e.canvas;if(s.element){let a=s.element;s.size.width=a.offsetWidth*n,s.size.height=a.offsetHeight*n}let r=t.particles,o=r.move;this.maxSpeed=ie(o.gravity.maxSpeed)*n,this.sizeAnimationSpeed=ie(r.size.animation.speed)*n}initParticle(e){let t=e.options,n=this.pixelRatio,s=t.move,r=s.distance,o=e.retina;o.moveDrift=ie(s.drift)*n,o.moveSpeed=ie(s.speed)*n,o.sizeAnimationSpeed=ie(t.size.animation.speed)*n;let a=o.maxDistance;a.horizontal=r.horizontal!==void 0?r.horizontal*n:void 0,a.vertical=r.vertical!==void 0?r.vertical*n:void 0,o.maxSpeed=ie(s.gravity.maxSpeed)*n}};function Mt(i){return i&&!i.destroyed}var Fp=60;function $1(i,e=Fp,t=!1){return{value:i,factor:t?Fp/e:Fp*i/1e3}}function ro(i,e,...t){let n=new lu(i,e);return Up(n,...t),n}var gu=class{constructor(e,t,n){this._intersectionManager=s=>{if(!(!Mt(this)||!this.actualOptions.pauseOnOutsideViewport))for(let r of s)r.target===this.interactivity.element&&(r.isIntersecting?this.play():this.pause())},this._nextFrame=s=>{try{if(!this._smooth&&this._lastFrameTime!==void 0&&s<this._lastFrameTime+1e3/this.fpsLimit){this.draw(!1);return}this._lastFrameTime??=s;let r=$1(s-this._lastFrameTime,this.fpsLimit,this._smooth);if(this.addLifeTime(r.value),this._lastFrameTime=s,r.value>1e3){this.draw(!1);return}if(this.particles.draw(r),!this.alive()){this.destroy();return}this.animationStatus&&this.draw(!1)}catch(r){Ai().error(`${It} in animation loop`,r)}},this._engine=e,this.id=Symbol(t),this.fpsLimit=120,this._smooth=!1,this._delay=0,this._duration=0,this._lifeTime=0,this._firstStart=!0,this.started=!1,this.destroyed=!1,this._paused=!0,this._lastFrameTime=0,this.zLayers=100,this.pageHidden=!1,this._clickHandlers=new Map,this._sourceOptions=n,this._initialSourceOptions=n,this.retina=new mu(this),this.canvas=new vc(this,this._engine),this.particles=new pu(this._engine,this),this.pathGenerators=new Map,this.interactivity={mouse:{clicking:!1,inside:!1}},this.plugins=new Map,this.effectDrawers=new Map,this.shapeDrawers=new Map,this._options=ro(this._engine,this),this.actualOptions=ro(this._engine,this),this._eventListeners=new _c(this),this._intersectionObserver=lv(s=>this._intersectionManager(s)),this._engine.dispatchEvent(Ut.containerBuilt,{container:this})}get animationStatus(){return!this._paused&&!this.pageHidden&&Mt(this)}get options(){return this._options}get sourceOptions(){return this._sourceOptions}addClickHandler(e){if(!Mt(this))return;let t=this.interactivity.element;if(!t)return;let n=(h,f,p)=>{if(!Mt(this))return;let g=this.retina.pixelRatio,x={x:f.x*g,y:f.y*g},m=this.particles.quadTree.queryCircle(x,p*g);e(h,m)},s=h=>{if(!Mt(this))return;let f=h,p={x:f.offsetX||f.clientX,y:f.offsetY||f.clientY};n(h,p,1)},r=()=>{Mt(this)&&(c=!0,u=!1)},o=()=>{Mt(this)&&(u=!0)},a=h=>{if(Mt(this)){if(c&&!u){let f=h,p=1,g=f.touches[f.touches.length-p];if(!g&&(g=f.changedTouches[f.changedTouches.length-p],!g))return;let x=this.canvas.element,m=x?x.getBoundingClientRect():void 0,d=0,v={x:g.clientX-(m?m.left:d),y:g.clientY-(m?m.top:d)};n(h,v,Math.max(g.radiusX,g.radiusY))}c=!1,u=!1}},l=()=>{Mt(this)&&(c=!1,u=!1)},c=!1,u=!1;this._clickHandlers.set("click",s),this._clickHandlers.set("touchstart",r),this._clickHandlers.set("touchmove",o),this._clickHandlers.set("touchend",a),this._clickHandlers.set("touchcancel",l);for(let[h,f]of this._clickHandlers)t.addEventListener(h,f)}addLifeTime(e){this._lifeTime+=e}addPath(e,t,n=!1){return!Mt(this)||!n&&this.pathGenerators.has(e)?!1:(this.pathGenerators.set(e,t),!0)}alive(){return!this._duration||this._lifeTime<=this._duration}clearClickHandlers(){if(Mt(this)){for(let[e,t]of this._clickHandlers)this.interactivity.element?.removeEventListener(e,t);this._clickHandlers.clear()}}destroy(e=!0){if(Mt(this)){this.stop(),this.clearClickHandlers(),this.particles.destroy(),this.canvas.destroy();for(let t of this.effectDrawers.values())t.destroy?.(this);for(let t of this.shapeDrawers.values())t.destroy?.(this);for(let t of this.effectDrawers.keys())this.effectDrawers.delete(t);for(let t of this.shapeDrawers.keys())this.shapeDrawers.delete(t);if(this._engine.clearPlugins(this),this.destroyed=!0,e){let t=this._engine.items,n=t.findIndex(r=>r===this);n>=0&&t.splice(n,1)}this._engine.dispatchEvent(Ut.containerDestroyed,{container:this})}}draw(e){if(!Mt(this))return;let t=e,n=s=>{t&&(this._lastFrameTime=void 0,t=!1),this._nextFrame(s)};this._drawAnimationFrame=tv(s=>n(s))}async export(e,t={}){for(let n of this.plugins.values()){if(!n.export)continue;let s=await n.export(e,t);if(s.supported)return s.blob}Ai().error(`${It} - Export plugin with type ${e} not found`)}handleClickMode(e){if(Mt(this)){this.particles.handleClickMode(e);for(let t of this.plugins.values())t.handleClickMode?.(e)}}async init(){if(!Mt(this))return;let e=this._engine.getSupportedEffects();for(let h of e){let f=this._engine.getEffectDrawer(h);f&&this.effectDrawers.set(h,f)}let t=this._engine.getSupportedShapes();for(let h of t){let f=this._engine.getShapeDrawer(h);f&&this.shapeDrawers.set(h,f)}await this.particles.initPlugins(),this._options=ro(this._engine,this,this._initialSourceOptions,this.sourceOptions),this.actualOptions=ro(this._engine,this,this._options);let n=await this._engine.getAvailablePlugins(this);for(let[h,f]of n)this.plugins.set(h,f);this.retina.init(),await this.canvas.init(),this.updateActualOptions(),this.canvas.initBackground(),this.canvas.resize();let{zLayers:s,duration:r,delay:o,fpsLimit:a,smooth:l}=this.actualOptions;this.zLayers=s,this._duration=ie(r)*1e3,this._delay=ie(o)*1e3,this._lifeTime=0;let c=120,u=0;this.fpsLimit=a>u?a:c,this._smooth=l;for(let h of this.effectDrawers.values())await h.init?.(this);for(let h of this.shapeDrawers.values())await h.init?.(this);for(let h of this.plugins.values())await h.init?.();this._engine.dispatchEvent(Ut.containerInit,{container:this}),await this.particles.init(),this.particles.setDensity();for(let h of this.plugins.values())h.particlesSetup?.();this._engine.dispatchEvent(Ut.particlesSetup,{container:this})}async loadTheme(e){Mt(this)&&(this._currentTheme=e,await this.refresh())}pause(){if(Mt(this)&&(this._drawAnimationFrame!==void 0&&(iv(this._drawAnimationFrame),delete this._drawAnimationFrame),!this._paused)){for(let e of this.plugins.values())e.pause?.();this.pageHidden||(this._paused=!0),this._engine.dispatchEvent(Ut.containerPaused,{container:this})}}play(e){if(!Mt(this))return;let t=this._paused||e;if(this._firstStart&&!this.actualOptions.autoPlay){this._firstStart=!1;return}if(this._paused&&(this._paused=!1),t)for(let n of this.plugins.values())n.play&&n.play();this._engine.dispatchEvent(Ut.containerPlay,{container:this}),this.draw(t??!1)}async refresh(){if(Mt(this))return this.stop(),this.start()}async reset(e){if(Mt(this))return this._initialSourceOptions=e,this._sourceOptions=e,this._options=ro(this._engine,this,this._initialSourceOptions,this.sourceOptions),this.actualOptions=ro(this._engine,this,this._options),this.refresh()}async start(){!Mt(this)||this.started||(await this.init(),this.started=!0,await new Promise(e=>{let t=async()=>{this._eventListeners.addListeners(),this.interactivity.element instanceof HTMLElement&&this._intersectionObserver&&this._intersectionObserver.observe(this.interactivity.element);for(let n of this.plugins.values())await n.start?.();this._engine.dispatchEvent(Ut.containerStarted,{container:this}),this.play(),e()};this._delayTimeout=setTimeout(()=>{t()},this._delay)}))}stop(){if(!(!Mt(this)||!this.started)){this._delayTimeout&&(clearTimeout(this._delayTimeout),delete this._delayTimeout),this._firstStart=!0,this.started=!1,this._eventListeners.removeListeners(),this.pause(),this.particles.clear(),this.canvas.stop(),this.interactivity.element instanceof HTMLElement&&this._intersectionObserver&&this._intersectionObserver.unobserve(this.interactivity.element);for(let e of this.plugins.values())e.stop?.();for(let e of this.plugins.keys())this.plugins.delete(e);this._sourceOptions=this._options,this._engine.dispatchEvent(Ut.containerStopped,{container:this})}}updateActualOptions(){this.actualOptions.responsive=[];let e=this.actualOptions.setResponsive(this.canvas.size.width,this.retina.pixelRatio,this._options);return this.actualOptions.setTheme(this._currentTheme),this._responsiveMaxWidth===e?!1:(this._responsiveMaxWidth=e,!0)}};var xu=class{constructor(){this._listeners=new Map}addEventListener(e,t){this.removeEventListener(e,t);let n=this._listeners.get(e);n||(n=[],this._listeners.set(e,n)),n.push(t)}dispatchEvent(e,t){this._listeners.get(e)?.forEach(s=>s(t))}hasEventListener(e){return!!this._listeners.get(e)}removeAllEventListeners(e){e?this._listeners.delete(e):this._listeners=new Map}removeEventListener(e,t){let n=this._listeners.get(e);if(!n)return;let s=n.length,r=n.indexOf(t);if(r<0)return;let a=1;s===a?this._listeners.delete(e):n.splice(r,a)}};async function Bp(i,e,t,n=!1){let s=e.get(i);return(!s||n)&&(s=await Promise.all([...t.values()].map(r=>r(i))),e.set(i,s)),s}async function Z1(i){let e=Xt(i.url,i.index);if(!e)return i.fallback;let t=await fetch(e);return t.ok?await t.json():(Ai().error(`${It} ${t.status} while retrieving config file`),i.fallback)}var Dv="true",Iv="false",zp="canvas",K1=i=>{let e;if(i instanceof HTMLCanvasElement||i.tagName.toLowerCase()===zp)e=i,e.dataset[En]||(e.dataset[En]=Iv);else{let n=i.getElementsByTagName(zp);n.length?(e=n[0],e.dataset[En]=Iv):(e=document.createElement(zp),e.dataset[En]=Dv,i.appendChild(e))}let t="100%";return e.style.width||(e.style.width=t),e.style.height||(e.style.height=t),e},J1=(i,e)=>{let t=e??document.getElementById(i);return t||(t=document.createElement("div"),t.id=i,t.dataset[En]=Dv,document.body.append(t),t)},yu=class{constructor(){this._configs=new Map,this._domArray=[],this._eventDispatcher=new xu,this._initialized=!1,this.plugins=[],this.colorManagers=new Map,this.easingFunctions=new Map,this._initializers={interactors:new Map,movers:new Map,updaters:new Map},this.interactors=new Map,this.movers=new Map,this.updaters=new Map,this.presets=new Map,this.effectDrawers=new Map,this.shapeDrawers=new Map,this.pathGenerators=new Map}get configs(){let e={};for(let[t,n]of this._configs)e[t]=n;return e}get items(){return this._domArray}get version(){return"3.7.1"}async addColorManager(e,t=!0){this.colorManagers.set(e.key,e),await this.refresh(t)}addConfig(e){let t=e.key??e.name??"default";this._configs.set(t,e),this._eventDispatcher.dispatchEvent(Ut.configAdded,{data:{name:t,config:e}})}async addEasing(e,t,n=!0){this.getEasing(e)||(this.easingFunctions.set(e,t),await this.refresh(n))}async addEffect(e,t,n=!0){Ct(e,s=>{this.getEffectDrawer(s)||this.effectDrawers.set(s,t)}),await this.refresh(n)}addEventListener(e,t){this._eventDispatcher.addEventListener(e,t)}async addInteractor(e,t,n=!0){this._initializers.interactors.set(e,t),await this.refresh(n)}async addMover(e,t,n=!0){this._initializers.movers.set(e,t),await this.refresh(n)}async addParticleUpdater(e,t,n=!0){this._initializers.updaters.set(e,t),await this.refresh(n)}async addPathGenerator(e,t,n=!0){this.getPathGenerator(e)||this.pathGenerators.set(e,t),await this.refresh(n)}async addPlugin(e,t=!0){this.getPlugin(e.id)||this.plugins.push(e),await this.refresh(t)}async addPreset(e,t,n=!1,s=!0){(n||!this.getPreset(e))&&this.presets.set(e,t),await this.refresh(s)}async addShape(e,t=!0){for(let n of e.validTypes)this.getShapeDrawer(n)||this.shapeDrawers.set(n,e);await this.refresh(t)}clearPlugins(e){this.updaters.delete(e),this.movers.delete(e),this.interactors.delete(e)}dispatchEvent(e,t){this._eventDispatcher.dispatchEvent(e,t)}dom(){return this.items}domItem(e){return this.item(e)}async getAvailablePlugins(e){let t=new Map;for(let n of this.plugins)n.needsPlugin(e.actualOptions)&&t.set(n.id,await n.getPlugin(e));return t}getEasing(e){return this.easingFunctions.get(e)??(t=>t)}getEffectDrawer(e){return this.effectDrawers.get(e)}async getInteractors(e,t=!1){return Bp(e,this.interactors,this._initializers.interactors,t)}async getMovers(e,t=!1){return Bp(e,this.movers,this._initializers.movers,t)}getPathGenerator(e){return this.pathGenerators.get(e)}getPlugin(e){return this.plugins.find(t=>t.id===e)}getPreset(e){return this.presets.get(e)}getShapeDrawer(e){return this.shapeDrawers.get(e)}getSupportedEffects(){return this.effectDrawers.keys()}getSupportedShapes(){return this.shapeDrawers.keys()}async getUpdaters(e,t=!1){return Bp(e,this.updaters,this._initializers.updaters,t)}init(){this._initialized||(this._initialized=!0)}item(e){let{items:t}=this,n=t[e];if(!n||n.destroyed){t.splice(e,1);return}return n}async load(e){let n=e.id??e.element?.id??`tsparticles${Math.floor(ke()*1e4)}`,{index:s,url:r}=e,o=r?await Z1({fallback:e.options,url:r,index:s}):e.options,a=Xt(o,s),{items:l}=this,c=l.findIndex(g=>g.id.description===n),u=0,h=new gu(this,n,a);if(c>=u){let g=this.item(c),x=1,m=0,d=g?x:m;g&&!g.destroyed&&g.destroy(!1),l.splice(c,d,h)}else l.push(h);let f=J1(n,e.element),p=K1(f);return h.canvas.loadCanvas(p),await h.start(),h}loadOptions(e,t){this.plugins.forEach(n=>n.loadOptions?.(e,t))}loadParticlesOptions(e,t,...n){let s=this.updaters.get(e);s&&s.forEach(r=>r.loadOptions?.(t,...n))}async refresh(e=!0){e&&await Promise.all(this.items.map(t=>t.refresh()))}removeEventListener(e,t){this._eventDispatcher.removeEventListener(e,t)}setOnClickHandler(e){let{items:t}=this;if(!t.length)throw new Error(`${It} can only set click handlers after calling tsParticles.load()`);t.forEach(n=>n.addClickHandler(e))}};function Lv(){let i=new yu;return i.init(),i}var St=class{constructor(e){this.type=In.external,this.container=e}};var fs=class{constructor(e){this.type=In.particles,this.container=e}};var ei;(function(i){i.clockwise="clockwise",i.counterClockwise="counter-clockwise",i.random="random"})(ei||(ei={}));var Ov;(function(i){i.linear="linear",i.radial="radial",i.random="random"})(Ov||(Ov={}));var sn;(function(i){i.easeInBack="ease-in-back",i.easeInCirc="ease-in-circ",i.easeInCubic="ease-in-cubic",i.easeInLinear="ease-in-linear",i.easeInQuad="ease-in-quad",i.easeInQuart="ease-in-quart",i.easeInQuint="ease-in-quint",i.easeInExpo="ease-in-expo",i.easeInSine="ease-in-sine",i.easeOutBack="ease-out-back",i.easeOutCirc="ease-out-circ",i.easeOutCubic="ease-out-cubic",i.easeOutLinear="ease-out-linear",i.easeOutQuad="ease-out-quad",i.easeOutQuart="ease-out-quart",i.easeOutQuint="ease-out-quint",i.easeOutExpo="ease-out-expo",i.easeOutSine="ease-out-sine",i.easeInOutBack="ease-in-out-back",i.easeInOutCirc="ease-in-out-circ",i.easeInOutCubic="ease-in-out-cubic",i.easeInOutLinear="ease-in-out-linear",i.easeInOutQuad="ease-in-out-quad",i.easeInOutQuart="ease-in-out-quart",i.easeInOutQuint="ease-in-out-quint",i.easeInOutExpo="ease-in-out-expo",i.easeInOutSine="ease-in-out-sine"})(sn||(sn={}));var Uv=Lv();en()||(window.tsParticles=Uv);var kp=.5,ks=0,Hi=1,Nv=60,Fv=0,j1=.01;function Bv(i){let e=i.initialPosition,{dx:t,dy:n}=mt(e,i.position),s=Math.abs(t),r=Math.abs(n),{maxDistance:o}=i.retina,a=o.horizontal,l=o.vertical;if(!a&&!l)return;let c=(a&&s>=a)??!1,u=(l&&r>=l)??!1;if((c||u)&&!i.misplaced)i.misplaced=!!a&&s>a||!!l&&r>l,a&&(i.velocity.x=i.velocity.y*kp-i.velocity.x),l&&(i.velocity.y=i.velocity.x*kp-i.velocity.y);else if((!a||s<a)&&(!l||r<l)&&i.misplaced)i.misplaced=!1;else if(i.misplaced){let h=i.position,f=i.velocity;a&&(h.x<e.x&&f.x<ks||h.x>e.x&&f.x>ks)&&(f.x*=-ke()),l&&(h.y<e.y&&f.y<ks||h.y>e.y&&f.y>ks)&&(f.y*=-ke())}}function zv(i,e,t,n,s,r){Q1(i,r);let o=i.gravity,a=o?.enable&&o.inverse?-Hi:Hi;s&&t&&(i.velocity.x+=s*r.factor/(Nv*t)),o?.enable&&t&&(i.velocity.y+=a*(o.acceleration*r.factor)/(Nv*t));let l=i.moveDecay;i.velocity.multTo(l);let c=i.velocity.mult(t);o?.enable&&n>ks&&(!o.inverse&&c.y>=ks&&c.y>=n||o.inverse&&c.y<=ks&&c.y<=-n)&&(c.y=a*n,t&&(i.velocity.y=c.y/t));let u=i.options.zIndex,h=(Hi-i.zIndexFactor)**u.velocityRate;c.multTo(h);let{position:f}=i;f.addTo(c),e.vibrate&&(f.x+=Math.sin(f.x*Math.cos(f.y)),f.y+=Math.cos(f.y*Math.sin(f.x)))}function kv(i,e){let t=i.container;if(!i.spin)return;let n={x:i.spin.direction===ei.clockwise?Math.cos:Math.sin,y:i.spin.direction===ei.clockwise?Math.sin:Math.cos};i.position.x=i.spin.center.x+i.spin.radius*n.x(i.spin.angle),i.position.y=i.spin.center.y+i.spin.radius*n.y(i.spin.angle),i.spin.radius+=i.spin.acceleration;let s=Math.max(t.canvas.size.width,t.canvas.size.height),r=s*kp;i.spin.radius>r?(i.spin.radius=r,i.spin.acceleration*=-Hi):i.spin.radius<Fv&&(i.spin.radius=Fv,i.spin.acceleration*=-Hi),i.spin.angle+=e*j1*(Hi-i.spin.radius/s)}function Q1(i,e){let t=i.options,n=t.move.path;if(!n.enable)return;if(i.lastPathTime<=i.pathDelay){i.lastPathTime+=e.value;return}let r=i.pathGenerator?.generate(i,e);r&&i.velocity.addTo(r),n.clamp&&(i.velocity.x=At(i.velocity.x,-Hi,Hi),i.velocity.y=At(i.velocity.y,-Hi,Hi)),i.lastPathTime-=i.pathDelay}function Vv(i){return i.slow.inRange?i.slow.factor:Hi}function Hv(i){let e=i.container,t=i.options,n=t.move.spin;if(!n.enable)return;let s=n.position??{x:50,y:50},r=.01,o={x:s.x*r*e.canvas.size.width,y:s.y*r*e.canvas.size.height},a=i.getPosition(),l=xt(a,o),c=ie(n.acceleration);i.retina.spinAcceleration=c*e.retina.pixelRatio;let u=0;i.spin={center:o,direction:i.velocity.x>=u?ei.clockwise:ei.counterClockwise,angle:i.velocity.angle,radius:l,acceleration:i.retina.spinAcceleration}}var eC=2,tC=1,iC=1,vu=class{init(e){let t=e.options,n=t.move.gravity;e.gravity={enable:n.enable,acceleration:ie(n.acceleration),inverse:n.inverse},Hv(e)}isEnabled(e){return!e.destroyed&&e.options.move.enable}move(e,t){let n=e.options,s=n.move;if(!s.enable)return;let r=e.container,o=r.retina.pixelRatio;e.retina.moveSpeed??=ie(s.speed)*o,e.retina.moveDrift??=ie(e.options.move.drift)*o;let a=Vv(e),l=e.retina.moveSpeed*r.retina.reduceFactor,c=e.retina.moveDrift,u=Jt(n.size.value)*o,h=s.size?e.getRadius()/u:tC,f=t.factor||iC,p=l*h*a*f/eC,g=e.retina.maxSpeed??r.retina.maxSpeed;s.spin.enable?kv(e,p):zv(e,s,p,g,c,t),Bv(e)}};async function Gv(i,e=!0){ae(i,"3.7.1"),await i.addMover("base",()=>Promise.resolve(new vu),e)}var nC=Math.PI*2,sC=0,Wv={x:0,y:0};function Xv(i){let{context:e,particle:t,radius:n}=i;t.circleRange||(t.circleRange={min:sC,max:nC});let s=t.circleRange;e.arc(Wv.x,Wv.y,n,s.min,s.max,!1)}var rC=12,oC=360,qv=0,_u=class{constructor(){this.validTypes=["circle"]}draw(e){Xv(e)}getSidesCount(){return rC}particleInit(e,t){let n=t.shapeData,s=n?.angle??{max:oC,min:qv};t.circleRange=An(s)?{min:Ei(s.min),max:Ei(s.max)}:{min:qv,max:Ei(s)}}};async function Yv(i,e=!0){ae(i,"3.7.1"),await i.addShape(new _u,e)}var bu=class{constructor(e,t){this._container=e,this._engine=t}init(e){let t=Rn(this._engine,e.options.color,e.id,e.options.reduceDuplicates);t&&(e.color=mc(t,e.options.color.animation,this._container.retina.reduceFactor))}isEnabled(e){let{h:t,s:n,l:s}=e.options.color.animation,{color:r}=e;return!e.destroyed&&!e.spawning&&(r?.h.value!==void 0&&t.enable||r?.s.value!==void 0&&n.enable||r?.l.value!==void 0&&s.enable)}update(e,t){gc(e.color,t)}};async function $v(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("color",t=>Promise.resolve(new bu(t,i)),e)}var Vs;(function(i){i[i.r=1]="r",i[i.g=2]="g",i[i.b=3]="b",i[i.a=4]="a"})(Vs||(Vs={}));var aC=/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,lC=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,Mu=16,cC=1,uC=255,Su=class{constructor(){this.key="hex",this.stringPrefix="#"}handleColor(e){return this._parseString(e.value)}handleRangeColor(e){return this._parseString(e.value)}parseString(e){return this._parseString(e)}_parseString(e){if(typeof e!="string"||!e?.startsWith(this.stringPrefix))return;let t=e.replace(aC,(s,r,o,a,l)=>r+r+o+o+a+a+(l!==void 0?l+l:"")),n=lC.exec(t);return n?{a:n[Vs.a]!==void 0?parseInt(n[Vs.a],Mu)/uC:cC,b:parseInt(n[Vs.b],Mu),g:parseInt(n[Vs.g],Mu),r:parseInt(n[Vs.r],Mu)}:void 0}};async function Zv(i,e=!0){ae(i,"3.7.1"),await i.addColorManager(new Su,e)}var oo;(function(i){i[i.h=1]="h",i[i.s=2]="s",i[i.l=3]="l",i[i.a=5]="a"})(oo||(oo={}));var wu=class{constructor(){this.key="hsl",this.stringPrefix="hsl"}handleColor(e){let t=e.value,n=t.hsl??e.value;if(n.h!==void 0&&n.s!==void 0&&n.l!==void 0)return Us(n)}handleRangeColor(e){let t=e.value,n=t.hsl??e.value;if(n.h!==void 0&&n.l!==void 0)return Us({h:ie(n.h),l:ie(n.l),s:ie(n.s)})}parseString(e){if(!e.startsWith("hsl"))return;let t=/hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,n=t.exec(e),s=4,r=1,o=10;return n?dv({a:n.length>s?rc(n[oo.a]):r,h:parseInt(n[oo.h],o),l:parseInt(n[oo.l],o),s:parseInt(n[oo.s],o)}):void 0}};async function Kv(i,e=!0){ae(i,"3.7.1"),await i.addColorManager(new wu,e)}var Tu=class{constructor(e){this.container=e}init(e){let t=e.options.opacity,n=1;e.opacity=cc(t,n);let s=t.animation;s.enable&&(e.opacity.velocity=ie(s.speed)/100*this.container.retina.reduceFactor,s.sync||(e.opacity.velocity*=ke()))}isEnabled(e){return!e.destroyed&&!e.spawning&&!!e.opacity&&e.opacity.enable&&((e.opacity.maxLoops??0)<=0||(e.opacity.maxLoops??0)>0&&(e.opacity.loops??0)<(e.opacity.maxLoops??0))}reset(e){e.opacity&&(e.opacity.time=0,e.opacity.loops=0)}update(e,t){!this.isEnabled(e)||!e.opacity||Qr(e,e.opacity,!0,e.options.opacity.animation.destroy,t)}};async function Jv(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("opacity",t=>Promise.resolve(new Tu(t)),e)}var Eu=0,ao=0;function jv(i){if(i.outMode!==it.bounce&&i.outMode!==it.split||i.direction!==Ue.left&&i.direction!==Ue.right)return;i.bounds.right<ao&&i.direction===Ue.left?i.particle.position.x=i.size+i.offset.x:i.bounds.left>i.canvasSize.width&&i.direction===Ue.right&&(i.particle.position.x=i.canvasSize.width-i.size-i.offset.x);let e=i.particle.velocity.x,t=!1;if(i.direction===Ue.right&&i.bounds.right>=i.canvasSize.width&&e>Eu||i.direction===Ue.left&&i.bounds.left<=ao&&e<Eu){let s=ie(i.particle.options.bounce.horizontal.value);i.particle.velocity.x*=-s,t=!0}if(!t)return;let n=i.offset.x+i.size;i.bounds.right>=i.canvasSize.width&&i.direction===Ue.right?i.particle.position.x=i.canvasSize.width-n:i.bounds.left<=ao&&i.direction===Ue.left&&(i.particle.position.x=n),i.outMode===it.split&&i.particle.destroy()}function Qv(i){if(i.outMode!==it.bounce&&i.outMode!==it.split||i.direction!==Ue.bottom&&i.direction!==Ue.top)return;i.bounds.bottom<ao&&i.direction===Ue.top?i.particle.position.y=i.size+i.offset.y:i.bounds.top>i.canvasSize.height&&i.direction===Ue.bottom&&(i.particle.position.y=i.canvasSize.height-i.size-i.offset.y);let e=i.particle.velocity.y,t=!1;if(i.direction===Ue.bottom&&i.bounds.bottom>=i.canvasSize.height&&e>Eu||i.direction===Ue.top&&i.bounds.top<=ao&&e<Eu){let s=ie(i.particle.options.bounce.vertical.value);i.particle.velocity.y*=-s,t=!0}if(!t)return;let n=i.offset.y+i.size;i.bounds.bottom>=i.canvasSize.height&&i.direction===Ue.bottom?i.particle.position.y=i.canvasSize.height-n:i.bounds.top<=ao&&i.direction===Ue.top&&(i.particle.position.y=n),i.outMode===it.split&&i.particle.destroy()}var Au=class{constructor(e){this.container=e,this.modes=[it.bounce,it.split]}update(e,t,n,s){if(!this.modes.includes(s))return;let r=this.container,o=!1;for(let f of r.plugins.values())if(f.particleBounce!==void 0&&(o=f.particleBounce(e,n,t)),o)break;if(o)return;let a=e.getPosition(),l=e.offset,c=e.getRadius(),u=os(a,c),h=r.canvas.size;jv({particle:e,outMode:s,direction:t,bounds:u,canvasSize:h,offset:l,size:c}),Qv({particle:e,outMode:s,direction:t,bounds:u,canvasSize:h,offset:l,size:c})}};var Cu=0,Ru=class{constructor(e){this.container=e,this.modes=[it.destroy]}update(e,t,n,s){if(!this.modes.includes(s))return;let r=this.container;switch(e.outType){case oi.normal:case oi.outside:if(Kr(e.position,r.canvas.size,ht.origin,e.getRadius(),t))return;break;case oi.inside:{let{dx:o,dy:a}=mt(e.position,e.moveCenter),{x:l,y:c}=e.velocity;if(l<Cu&&o>e.moveCenter.radius||c<Cu&&a>e.moveCenter.radius||l>=Cu&&o<-e.moveCenter.radius||c>=Cu&&a<-e.moveCenter.radius)return;break}}r.particles.remove(e,e.group,!0)}};var Pu=0,Iu=class{constructor(e){this.container=e,this.modes=[it.none]}update(e,t,n,s){if(!this.modes.includes(s)||((e.options.move.distance.horizontal&&(t===Ue.left||t===Ue.right))??(e.options.move.distance.vertical&&(t===Ue.top||t===Ue.bottom))))return;let r=e.options.move.gravity,o=this.container,a=o.canvas.size,l=e.getRadius();if(r.enable){let c=e.position;(!r.inverse&&c.y>a.height+l&&t===Ue.bottom||r.inverse&&c.y<-l&&t===Ue.top)&&o.particles.remove(e)}else{if(e.velocity.y>Pu&&e.position.y<=a.height+l||e.velocity.y<Pu&&e.position.y>=-l||e.velocity.x>Pu&&e.position.x<=a.width+l||e.velocity.x<Pu&&e.position.x>=-l)return;Kr(e.position,o.canvas.size,ht.origin,l,t)||o.particles.remove(e)}}};var Du=0,Lu=0,Ou=class{constructor(e){this.container=e,this.modes=[it.out]}update(e,t,n,s){if(!this.modes.includes(s))return;let r=this.container;switch(e.outType){case oi.inside:{let{x:o,y:a}=e.velocity,l=ht.origin;l.length=e.moveCenter.radius,l.angle=e.velocity.angle+Math.PI,l.addTo(ht.create(e.moveCenter));let{dx:c,dy:u}=mt(e.position,l);if(o<=Du&&c>=Lu||a<=Du&&u>=Lu||o>=Du&&c<=Lu||a>=Du&&u<=Lu)return;e.position.x=Math.floor(Bt({min:0,max:r.canvas.size.width})),e.position.y=Math.floor(Bt({min:0,max:r.canvas.size.height}));let{dx:h,dy:f}=mt(e.position,e.moveCenter);e.direction=Math.atan2(-f,-h),e.velocity.angle=e.direction;break}default:{if(Kr(e.position,r.canvas.size,ht.origin,e.getRadius(),t))return;switch(e.outType){case oi.outside:{e.position.x=Math.floor(Bt({min:-e.moveCenter.radius,max:e.moveCenter.radius}))+e.moveCenter.x,e.position.y=Math.floor(Bt({min:-e.moveCenter.radius,max:e.moveCenter.radius}))+e.moveCenter.y;let{dx:o,dy:a}=mt(e.position,e.moveCenter);e.moveCenter.radius&&(e.direction=Math.atan2(a,o),e.velocity.angle=e.direction);break}case oi.normal:{let o=e.options.move.warp,a=r.canvas.size,l={bottom:a.height+e.getRadius()+e.offset.y,left:-e.getRadius()-e.offset.x,right:a.width+e.getRadius()+e.offset.x,top:-e.getRadius()-e.offset.y},c=e.getRadius(),u=os(e.position,c);t===Ue.right&&u.left>a.width+e.offset.x?(e.position.x=l.left,e.initialPosition.x=e.position.x,o||(e.position.y=ke()*a.height,e.initialPosition.y=e.position.y)):t===Ue.left&&u.right<-e.offset.x&&(e.position.x=l.right,e.initialPosition.x=e.position.x,o||(e.position.y=ke()*a.height,e.initialPosition.y=e.position.y)),t===Ue.bottom&&u.top>a.height+e.offset.y?(o||(e.position.x=ke()*a.width,e.initialPosition.x=e.position.x),e.position.y=l.top,e.initialPosition.y=e.position.y):t===Ue.top&&u.bottom<-e.offset.y&&(o||(e.position.x=ke()*a.width,e.initialPosition.x=e.position.x),e.position.y=l.bottom,e.initialPosition.y=e.position.y);break}}break}}}};var hC=(i,e)=>i.default===e||i.bottom===e||i.left===e||i.right===e||i.top===e,Uu=class{constructor(e){this._addUpdaterIfMissing=(t,n,s)=>{let r=t.options.move.outModes;!this.updaters.has(n)&&hC(r,n)&&this.updaters.set(n,s(this.container))},this._updateOutMode=(t,n,s,r)=>{for(let o of this.updaters.values())o.update(t,r,n,s)},this.container=e,this.updaters=new Map}init(e){this._addUpdaterIfMissing(e,it.bounce,t=>new Au(t)),this._addUpdaterIfMissing(e,it.out,t=>new Ou(t)),this._addUpdaterIfMissing(e,it.destroy,t=>new Ru(t)),this._addUpdaterIfMissing(e,it.none,t=>new Iu(t))}isEnabled(e){return!e.destroyed&&!e.spawning}update(e,t){let n=e.options.move.outModes;this._updateOutMode(e,t,n.bottom??n.default,Ue.bottom),this._updateOutMode(e,t,n.left??n.default,Ue.left),this._updateOutMode(e,t,n.right??n.default,Ue.right),this._updateOutMode(e,t,n.top??n.default,Ue.top)}};async function e_(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("outModes",t=>Promise.resolve(new Uu(t)),e)}var lo;(function(i){i[i.r=1]="r",i[i.g=2]="g",i[i.b=3]="b",i[i.a=5]="a"})(lo||(lo={}));var Nu=class{constructor(){this.key="rgb",this.stringPrefix="rgb"}handleColor(e){let t=e.value,n=t.rgb??e.value;if(n.r!==void 0)return n}handleRangeColor(e){let t=e.value,n=t.rgb??e.value;if(n.r!==void 0)return{r:ie(n.r),g:ie(n.g),b:ie(n.b)}}parseString(e){if(!e.startsWith(this.stringPrefix))return;let t=/rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,n=t.exec(e),s=10;return n?{a:n.length>4?rc(n[lo.a]):1,b:parseInt(n[lo.b],s),g:parseInt(n[lo.g],s),r:parseInt(n[lo.r],s)}:void 0}};async function t_(i,e=!0){ae(i,"3.7.1"),await i.addColorManager(new Nu,e)}var Hs=0,Fu=class{init(e){let t=e.container,n=e.options.size,s=n.animation;s.enable&&(e.size.velocity=(e.retina.sizeAnimationSpeed??t.retina.sizeAnimationSpeed)/100*t.retina.reduceFactor,s.sync||(e.size.velocity*=ke()))}isEnabled(e){return!e.destroyed&&!e.spawning&&e.size.enable&&((e.size.maxLoops??Hs)<=Hs||(e.size.maxLoops??Hs)>Hs&&(e.size.loops??Hs)<(e.size.maxLoops??Hs))}reset(e){e.size.loops=Hs}update(e,t){this.isEnabled(e)&&Qr(e,e.size,!0,e.options.size.animation.destroy,t)}};async function i_(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("size",()=>Promise.resolve(new Fu),e)}async function n_(i,e=!0){ae(i,"3.7.1"),await Zv(i,!1),await Kv(i,!1),await t_(i,!1),await Gv(i,!1),await Yv(i,!1),await $v(i,!1),await Jv(i,!1),await e_(i,!1),await i_(i,!1),await i.refresh(e)}async function s_(i,e=!0){ae(i,"3.7.1"),await i.addEasing(sn.easeInQuad,t=>t**2,!1),await i.addEasing(sn.easeOutQuad,t=>1-(1-t)**2,!1),await i.addEasing(sn.easeInOutQuad,t=>t<.5?2*t**2:1-(-2*t+2)**2/2,!1),await i.refresh(e)}function r_(i,e){let{context:t,opacity:n}=i,s=.5,r=t.globalAlpha;if(!e)return;let o=e.width,a=o*s;t.globalAlpha=n,t.drawImage(e,-a,-a,o,o),t.globalAlpha=r}var Vp='"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"',o_=0,Bu=class{constructor(){this.validTypes=["emoji"],this._emojiShapeDict=new Map}destroy(){for(let[e,t]of this._emojiShapeDict)t instanceof ImageBitmap&&t?.close(),this._emojiShapeDict.delete(e)}draw(e){let t=e.particle.emojiDataKey;if(!t)return;let n=this._emojiShapeDict.get(t);n&&r_(e,n)}async init(e){let t=e.actualOptions,{validTypes:n}=this;if(!n.find(o=>Qe(o,t.particles.shape.type)))return;let s=[Rp(Vp)],r=n.map(o=>t.particles.shape.options[o]).find(o=>!!o);r&&Ct(r,o=>{o.font&&s.push(Rp(o.font))}),await Promise.all(s)}particleDestroy(e){e.emojiDataKey=void 0}particleInit(e,t){let s=t.shapeData;if(!s?.value)return;let r=Xt(s.value,t.randomIndexData);if(!r)return;let o=typeof r=="string"?{font:s.font??Vp,padding:s.padding??o_,value:r}:{font:Vp,padding:o_,...s,...r},a=o.font,l=o.value,c=`${l}_${a}`;if(this._emojiShapeDict.has(c)){t.emojiDataKey=c;return}let u=o.padding*2,h=Jt(t.size.value),f=h+u,p=f*2,g;if(typeof OffscreenCanvas<"u"){let x=new OffscreenCanvas(p,p),m=x.getContext("2d");if(!m)return;m.font=`400 ${h*2}px ${a}`,m.textBaseline="middle",m.textAlign="center",m.fillText(l,f,f),g=x.transferToImageBitmap()}else{let x=document.createElement("canvas");x.width=p,x.height=p;let m=x.getContext("2d");if(!m)return;m.font=`400 ${h*2}px ${a}`,m.textBaseline="middle",m.textAlign="center",m.fillText(l,f,f),g=x}this._emojiShapeDict.set(c,g),t.emojiDataKey=c}};async function a_(i,e=!0){ae(i,"3.7.1"),await i.addShape(new Bu,e)}var fC=1,dC=1,l_=0;function c_(i,e,t,n,s,r){let o=e.actualOptions.interactivity.modes.attract;if(!o)return;let a=e.particles.quadTree.query(s,r);for(let l of a){let{dx:c,dy:u,distance:h}=mt(l.position,t),f=o.speed*o.factor,p=At(i.getEasing(o.easing)(dC-h/n)*f,fC,o.maxSpeed),g=ht.create(h?c/h*p:f,h?u/h*p:f);l.position.subFrom(g)}}function u_(i,e,t){e.attract||(e.attract={particles:[]});let{attract:n}=e;if(n.finish||(n.count||(n.count=0),n.count++,n.count===e.particles.count&&(n.finish=!0)),n.clicking){let s=e.interactivity.mouse.clickPosition,r=e.retina.attractModeDistance;if(!r||r<l_||!s)return;c_(i,e,s,r,new vt(s.x,s.y,r),o=>t(o))}else n.clicking===!1&&(n.particles=[])}function h_(i,e,t){let n=e.interactivity.mouse.position,s=e.retina.attractModeDistance;!s||s<l_||!n||c_(i,e,n,s,new vt(n.x,n.y,s),r=>t(r))}var zu=class{constructor(){this.distance=200,this.duration=.4,this.easing=sn.easeOutQuad,this.factor=1,this.maxSpeed=50,this.speed=1}load(e){N(e)||(e.distance!==void 0&&(this.distance=e.distance),e.duration!==void 0&&(this.duration=e.duration),e.easing!==void 0&&(this.easing=e.easing),e.factor!==void 0&&(this.factor=e.factor),e.maxSpeed!==void 0&&(this.maxSpeed=e.maxSpeed),e.speed!==void 0&&(this.speed=e.speed))}};var na="attract",ku=class extends St{constructor(e,t){super(t),this._engine=e,t.attract||(t.attract={particles:[]}),this.handleClickMode=n=>{let s=this.container.actualOptions,r=s.interactivity.modes.attract;if(!(!r||n!==na)){t.attract||(t.attract={particles:[]}),t.attract.clicking=!0,t.attract.count=0;for(let o of t.attract.particles)this.isEnabled(o)&&o.velocity.setTo(o.initialVelocity);t.attract.particles=[],t.attract.finish=!1,setTimeout(()=>{t.destroyed||(t.attract||(t.attract={particles:[]}),t.attract.clicking=!1)},r.duration*1e3)}}}clear(){}init(){let e=this.container,t=e.actualOptions.interactivity.modes.attract;t&&(e.retina.attractModeDistance=t.distance*e.retina.pixelRatio)}interact(){let e=this.container,t=e.actualOptions,n=e.interactivity.status===mi,s=t.interactivity.events,{enable:r,mode:o}=s.onHover,{enable:a,mode:l}=s.onClick;n&&r&&Qe(na,o)?h_(this._engine,this.container,c=>this.isEnabled(c)):a&&Qe(na,l)&&u_(this._engine,this.container,c=>this.isEnabled(c))}isEnabled(e){let t=this.container,n=t.actualOptions,s=t.interactivity.mouse,r=(e?.interactivity??n.interactivity).events;if((!s.position||!r.onHover.enable)&&(!s.clickPosition||!r.onClick.enable))return!1;let o=r.onHover.mode,a=r.onClick.mode;return Qe(na,o)||Qe(na,a)}loadModeOptions(e,...t){e.attract||(e.attract=new zu);for(let n of t)e.attract.load(n?.attract)}reset(){}};async function f_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalAttract",t=>Promise.resolve(new ku(i,t)),e)}var pC=2,Vu=.5,mC=Math.PI*Vu,d_=2,p_=10,gC=0;function m_(i,e,t,n,s){let r=i.particles.quadTree.query(n,s);for(let o of r)n instanceof vt?lc($o(o),{position:e,radius:t,mass:t**pC*mC,velocity:ht.origin,factor:ht.origin}):n instanceof zt&&uv(o,os(e,t))}function xC(i,e,t,n){let s=document.querySelectorAll(e);s.length&&s.forEach(r=>{let o=r,a=i.retina.pixelRatio,l={x:(o.offsetLeft+o.offsetWidth*Vu)*a,y:(o.offsetTop+o.offsetHeight*Vu)*a},c=o.offsetWidth*Vu*a,u=p_*a,h=t.type===tn.circle?new vt(l.x,l.y,c+u):new zt(o.offsetLeft*a-u,o.offsetTop*a-u,o.offsetWidth*a+u*d_,o.offsetHeight*a+u*d_);n(l,c,h)})}function g_(i,e,t,n){jr(t,e,(s,r)=>xC(i,s,r,(o,a,l)=>m_(i,o,a,l,n)))}function x_(i,e){let t=i.retina.pixelRatio,n=p_*t,s=i.interactivity.mouse.position,r=i.retina.bounceModeDistance;!r||r<gC||!s||m_(i,s,r,new vt(s.x,s.y,r+n),e)}var Hu=class{constructor(){this.distance=200}load(e){N(e)||e.distance!==void 0&&(this.distance=e.distance)}};var Gu="bounce",Wu=class extends St{constructor(e){super(e)}clear(){}init(){let e=this.container,t=e.actualOptions.interactivity.modes.bounce;t&&(e.retina.bounceModeDistance=t.distance*e.retina.pixelRatio)}interact(){let e=this.container,t=e.actualOptions,n=t.interactivity.events,s=e.interactivity.status===mi,r=n.onHover.enable,o=n.onHover.mode,a=n.onDiv;s&&r&&Qe(Gu,o)?x_(this.container,l=>this.isEnabled(l)):g_(this.container,a,Gu,l=>this.isEnabled(l))}isEnabled(e){let t=this.container,n=t.actualOptions,s=t.interactivity.mouse,r=(e?.interactivity??n.interactivity).events,o=r.onDiv;return!!s.position&&r.onHover.enable&&Qe(Gu,r.onHover.mode)||Jr(Gu,o)}loadModeOptions(e,...t){e.bounce||(e.bounce=new Hu);for(let n of t)e.bounce.load(n?.bounce)}reset(){}};async function y_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalBounce",t=>Promise.resolve(new Wu(t)),e)}var co=class{constructor(){this.distance=200,this.duration=.4,this.mix=!1}load(e){if(!N(e)){if(e.distance!==void 0&&(this.distance=e.distance),e.duration!==void 0&&(this.duration=e.duration),e.mix!==void 0&&(this.mix=e.mix),e.opacity!==void 0&&(this.opacity=e.opacity),e.color!==void 0){let t=Kt(this.color)?void 0:this.color;this.color=Ct(e.color,n=>ot.create(t,n))}e.size!==void 0&&(this.size=e.size)}}};var Xu=class extends co{constructor(){super(),this.selectors=[]}load(e){super.load(e),!N(e)&&e.selectors!==void 0&&(this.selectors=e.selectors)}};var qu=class extends co{load(e){super.load(e),!N(e)&&(this.divs=Ct(e.divs,t=>{let n=new Xu;return n.load(t),n}))}};var Gi;(function(i){i.color="color",i.opacity="opacity",i.size="size"})(Gi||(Gi={}));function Hp(i,e,t,n){if(e>=t){let s=i+(e-t)*n;return At(s,i,e)}else if(e<t){let s=i-(t-e)*n;return At(s,e,i)}}var Gs="bubble",Gp=0,yC=0,vC=2,v_=1,__=1,_C=0,bC=0,Wp=.5,Xp=1,Yu=class extends St{constructor(e,t){super(e),this._clickBubble=()=>{let n=this.container,s=n.actualOptions,r=n.interactivity.mouse.clickPosition,o=s.interactivity.modes.bubble;if(!o||!r)return;n.bubble||(n.bubble={});let a=n.retina.bubbleModeDistance;if(!a||a<Gp)return;let l=n.particles.quadTree.queryCircle(r,a,u=>this.isEnabled(u)),{bubble:c}=n;for(let u of l){if(!c.clicking)continue;u.bubble.inRange=!c.durationEnd;let h=u.getPosition(),f=xt(h,r),p=(new Date().getTime()-(n.interactivity.mouse.clickTime??yC))/1e3;p>o.duration&&(c.durationEnd=!0),p>o.duration*vC&&(c.clicking=!1,c.durationEnd=!1);let g={bubbleObj:{optValue:n.retina.bubbleModeSize,value:u.bubble.radius},particlesObj:{optValue:Jt(u.options.size.value)*n.retina.pixelRatio,value:u.size.value},type:Gi.size};this._process(u,f,p,g);let x={bubbleObj:{optValue:o.opacity,value:u.bubble.opacity},particlesObj:{optValue:Jt(u.options.opacity.value),value:u.opacity?.value??v_},type:Gi.opacity};this._process(u,f,p,x),!c.durationEnd&&f<=a?this._hoverBubbleColor(u,f):delete u.bubble.color}},this._hoverBubble=()=>{let n=this.container,s=n.interactivity.mouse.position,r=n.retina.bubbleModeDistance;if(!r||r<Gp||!s)return;let o=n.particles.quadTree.queryCircle(s,r,a=>this.isEnabled(a));for(let a of o){a.bubble.inRange=!0;let l=a.getPosition(),c=xt(l,s),u=__-c/r;c<=r?u>=bC&&n.interactivity.status===mi&&(this._hoverBubbleSize(a,u),this._hoverBubbleOpacity(a,u),this._hoverBubbleColor(a,u)):this.reset(a),n.interactivity.status===Yo&&this.reset(a)}},this._hoverBubbleColor=(n,s,r)=>{let o=this.container.actualOptions,a=r??o.interactivity.modes.bubble;if(a){if(!n.bubble.finalColor){let l=a.color;if(!l)return;let c=Xt(l);n.bubble.finalColor=Rn(this._engine,c)}if(n.bubble.finalColor)if(a.mix){n.bubble.color=void 0;let l=n.getFillColor();n.bubble.color=l?Dp(Zo(l,n.bubble.finalColor,__-s,s)):n.bubble.finalColor}else n.bubble.color=n.bubble.finalColor}},this._hoverBubbleOpacity=(n,s,r)=>{let o=this.container,a=o.actualOptions,l=r?.opacity??a.interactivity.modes.bubble?.opacity;if(!l)return;let c=n.options.opacity.value,u=n.opacity?.value??v_,h=Hp(u,l,Jt(c),s);h!==void 0&&(n.bubble.opacity=h)},this._hoverBubbleSize=(n,s,r)=>{let o=this.container,a=r?.size?r.size*o.retina.pixelRatio:o.retina.bubbleModeSize;if(a===void 0)return;let l=Jt(n.options.size.value)*o.retina.pixelRatio,c=n.size.value,u=Hp(c,a,l,s);u!==void 0&&(n.bubble.radius=u)},this._process=(n,s,r,o)=>{let a=this.container,l=o.bubbleObj.optValue,c=a.actualOptions,u=c.interactivity.modes.bubble;if(!u||l===void 0)return;let h=u.duration,f=a.retina.bubbleModeDistance,p=o.particlesObj.optValue,g=o.bubbleObj.value,x=o.particlesObj.value??_C,m=o.type;if(!(!f||f<Gp||l===p))if(a.bubble||(a.bubble={}),a.bubble.durationEnd)g&&(m===Gi.size&&delete n.bubble.radius,m===Gi.opacity&&delete n.bubble.opacity);else if(s<=f){if((g??x)!==l){let v=x-r*(x-l)/h;m===Gi.size&&(n.bubble.radius=v),m===Gi.opacity&&(n.bubble.opacity=v)}}else m===Gi.size&&delete n.bubble.radius,m===Gi.opacity&&delete n.bubble.opacity},this._singleSelectorHover=(n,s,r)=>{let o=this.container,a=document.querySelectorAll(s),l=o.actualOptions.interactivity.modes.bubble;!l||!a.length||a.forEach(c=>{let u=c,h=o.retina.pixelRatio,f={x:(u.offsetLeft+u.offsetWidth*Wp)*h,y:(u.offsetTop+u.offsetHeight*Wp)*h},p=u.offsetWidth*Wp*h,g=r.type===tn.circle?new vt(f.x,f.y,p):new zt(u.offsetLeft*h,u.offsetTop*h,u.offsetWidth*h,u.offsetHeight*h),x=o.particles.quadTree.query(g,m=>this.isEnabled(m));for(let m of x){if(!g.contains(m.getPosition()))continue;m.bubble.inRange=!0;let d=l.divs,v=ac(d,u);(!m.bubble.div||m.bubble.div!==u)&&(this.clear(m,n,!0),m.bubble.div=u),this._hoverBubbleSize(m,Xp,v),this._hoverBubbleOpacity(m,Xp,v),this._hoverBubbleColor(m,Xp,v)}})},this._engine=t,e.bubble||(e.bubble={}),this.handleClickMode=n=>{n===Gs&&(e.bubble||(e.bubble={}),e.bubble.clicking=!0)}}clear(e,t,n){e.bubble.inRange&&!n||(delete e.bubble.div,delete e.bubble.opacity,delete e.bubble.radius,delete e.bubble.color)}init(){let e=this.container,t=e.actualOptions.interactivity.modes.bubble;t&&(e.retina.bubbleModeDistance=t.distance*e.retina.pixelRatio,t.size!==void 0&&(e.retina.bubbleModeSize=t.size*e.retina.pixelRatio))}interact(e){let t=this.container.actualOptions,n=t.interactivity.events,s=n.onHover,r=n.onClick,o=s.enable,a=s.mode,l=r.enable,c=r.mode,u=n.onDiv;o&&Qe(Gs,a)?this._hoverBubble():l&&Qe(Gs,c)?this._clickBubble():jr(Gs,u,(h,f)=>this._singleSelectorHover(e,h,f))}isEnabled(e){let t=this.container,n=t.actualOptions,s=t.interactivity.mouse,r=(e?.interactivity??n.interactivity).events,{onClick:o,onDiv:a,onHover:l}=r,c=Jr(Gs,a);return c||l.enable&&s.position||o.enable&&s.clickPosition?Qe(Gs,l.mode)||Qe(Gs,o.mode)||c:!1}loadModeOptions(e,...t){e.bubble||(e.bubble=new qu);for(let n of t)e.bubble.load(n?.bubble)}reset(e){e.bubble.inRange=!1}};async function b_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalBubble",t=>Promise.resolve(new Yu(t,i)),e)}var $u=class{constructor(){this.opacity=.5}load(e){N(e)||e.opacity!==void 0&&(this.opacity=e.opacity)}};var Zu=class{constructor(){this.distance=80,this.links=new $u,this.radius=60}load(e){N(e)||(e.distance!==void 0&&(this.distance=e.distance),this.links.load(e.links),e.radius!==void 0&&(this.radius=e.radius))}};var M_=0,S_=1,MC=0;function SC(i,e,t,n){let s=Math.floor(t.getRadius()/e.getRadius()),r=e.getFillColor(),o=t.getFillColor();if(!r||!o)return;let a=e.getPosition(),l=t.getPosition(),c=Zo(r,o,e.getRadius(),t.getRadius()),u=i.createLinearGradient(a.x,a.y,l.x,l.y);return u.addColorStop(M_,as(r,n)),u.addColorStop(At(s,M_,S_),ri(c,n)),u.addColorStop(S_,as(o,n)),u}function wC(i,e,t,n,s){ls(i,n,s),i.lineWidth=e,i.strokeStyle=t,i.stroke()}function TC(i,e,t,n){let s=i.actualOptions,r=s.interactivity.modes.connect;if(r)return SC(e,t,n,r.links.opacity)}function w_(i,e,t){i.canvas.draw(n=>{let s=TC(i,n,e,t);if(!s)return;let r=e.getPosition(),o=t.getPosition();wC(n,e.retina.linksWidth??MC,s,r,o)})}var EC="connect",T_=0,Ku=class extends St{constructor(e){super(e)}clear(){}init(){let e=this.container,t=e.actualOptions.interactivity.modes.connect;t&&(e.retina.connectModeDistance=t.distance*e.retina.pixelRatio,e.retina.connectModeRadius=t.radius*e.retina.pixelRatio)}interact(){let e=this.container;if(e.actualOptions.interactivity.events.onHover.enable&&e.interactivity.status==="pointermove"){let n=e.interactivity.mouse.position,{connectModeDistance:s,connectModeRadius:r}=e.retina;if(!s||s<T_||!r||r<T_||!n)return;let o=Math.abs(r),a=e.particles.quadTree.queryCircle(n,o,l=>this.isEnabled(l));a.forEach((l,c)=>{let u=l.getPosition(),h=1;for(let f of a.slice(c+h)){let p=f.getPosition(),g=Math.abs(s),x=Math.abs(u.x-p.x),m=Math.abs(u.y-p.y);x<g&&m<g&&w_(e,l,f)}})}}isEnabled(e){let t=this.container,n=t.interactivity.mouse,s=(e?.interactivity??t.actualOptions.interactivity).events;return s.onHover.enable&&n.position?Qe(EC,s.onHover.mode):!1}loadModeOptions(e,...t){e.connect||(e.connect=new Zu);for(let n of t)e.connect.load(n?.connect)}reset(){}};async function E_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalConnect",t=>Promise.resolve(new Ku(t)),e)}var Ju=class{constructor(){this.blink=!1,this.consent=!1,this.opacity=1}load(e){N(e)||(e.blink!==void 0&&(this.blink=e.blink),e.color!==void 0&&(this.color=ot.create(this.color,e.color)),e.consent!==void 0&&(this.consent=e.consent),e.opacity!==void 0&&(this.opacity=e.opacity))}};var ju=class{constructor(){this.distance=100,this.links=new Ju}load(e){N(e)||(e.distance!==void 0&&(this.distance=e.distance),this.links.load(e.links))}};var AC=0;function CC(i,e,t,n,s,r){ls(i,t,n),i.strokeStyle=ri(s,r),i.lineWidth=e,i.stroke()}function A_(i,e,t,n,s){i.canvas.draw(r=>{let o=e.getPosition();CC(r,e.retina.linksWidth??AC,o,s,t,n)})}var RC="grab",PC=0,IC=0,Qu=class extends St{constructor(e,t){super(e),this._engine=t}clear(){}init(){let e=this.container,t=e.actualOptions.interactivity.modes.grab;t&&(e.retina.grabModeDistance=t.distance*e.retina.pixelRatio)}interact(){let e=this.container,t=e.actualOptions,n=t.interactivity;if(!n.modes.grab||!n.events.onHover.enable||e.interactivity.status!==mi)return;let s=e.interactivity.mouse.position;if(!s)return;let r=e.retina.grabModeDistance;if(!r||r<PC)return;let o=e.particles.quadTree.queryCircle(s,r,a=>this.isEnabled(a));for(let a of o){let l=a.getPosition(),c=xt(l,s);if(c>r)continue;let u=n.modes.grab.links,h=u.opacity,f=h-c*h/r;if(f<=IC)continue;let p=u.color??a.options.links?.color;if(!e.particles.grabLineColor&&p){let x=n.modes.grab.links;e.particles.grabLineColor=pc(this._engine,p,x.blink,x.consent)}let g=Ko(a,void 0,e.particles.grabLineColor);g&&A_(e,a,g,f,s)}}isEnabled(e){let t=this.container,n=t.interactivity.mouse,s=(e?.interactivity??t.actualOptions.interactivity).events;return s.onHover.enable&&!!n.position&&Qe(RC,s.onHover.mode)}loadModeOptions(e,...t){e.grab||(e.grab=new ju);for(let n of t)e.grab.load(n?.grab)}reset(){}};async function C_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalGrab",t=>Promise.resolve(new Qu(t,i)),e)}var DC="pause",eh=class extends St{constructor(e){super(e),this.handleClickMode=t=>{if(t!==DC)return;let n=this.container;n.animationStatus?n.pause():n.play()}}clear(){}init(){}interact(){}isEnabled(){return!0}reset(){}};async function R_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalPause",t=>Promise.resolve(new eh(t)),e)}var th=class{constructor(){this.default=!0,this.groups=[],this.quantity=4}load(e){if(N(e))return;e.default!==void 0&&(this.default=e.default),e.groups!==void 0&&(this.groups=e.groups.map(n=>n)),this.groups.length||(this.default=!0);let t=e.quantity;t!==void 0&&(this.quantity=Ae(t))}};var LC="push",OC=0,ih=class extends St{constructor(e){super(e),this.handleClickMode=t=>{if(t!==LC)return;let n=this.container,s=n.actualOptions,r=s.interactivity.modes.push;if(!r)return;let o=ie(r.quantity);if(o<=OC)return;let a=Zr([void 0,...r.groups]),l=a!==void 0?n.actualOptions.particles.groups[a]:void 0;n.particles.push(o,n.interactivity.mouse,l,a)}}clear(){}init(){}interact(){}isEnabled(){return!0}loadModeOptions(e,...t){e.push||(e.push=new th);for(let n of t)e.push.load(n?.push)}reset(){}};async function P_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalPush",t=>Promise.resolve(new ih(t)),e)}var nh=class{constructor(){this.quantity=2}load(e){if(N(e))return;let t=e.quantity;t!==void 0&&(this.quantity=Ae(t))}};var UC="remove",sh=class extends St{constructor(e){super(e),this.handleClickMode=t=>{let n=this.container,s=n.actualOptions;if(!s.interactivity.modes.remove||t!==UC)return;let r=ie(s.interactivity.modes.remove.quantity);n.particles.removeQuantity(r)}}clear(){}init(){}interact(){}isEnabled(){return!0}loadModeOptions(e,...t){e.remove||(e.remove=new nh);for(let n of t)e.remove.load(n?.remove)}reset(){}};async function I_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalRemove",t=>Promise.resolve(new sh(t)),e)}var uo=class{constructor(){this.distance=200,this.duration=.4,this.factor=100,this.speed=1,this.maxSpeed=50,this.easing=sn.easeOutQuad}load(e){N(e)||(e.distance!==void 0&&(this.distance=e.distance),e.duration!==void 0&&(this.duration=e.duration),e.easing!==void 0&&(this.easing=e.easing),e.factor!==void 0&&(this.factor=e.factor),e.speed!==void 0&&(this.speed=e.speed),e.maxSpeed!==void 0&&(this.maxSpeed=e.maxSpeed))}};var rh=class extends uo{constructor(){super(),this.selectors=[]}load(e){super.load(e),!N(e)&&e.selectors!==void 0&&(this.selectors=e.selectors)}};var oh=class extends uo{load(e){super.load(e),!N(e)&&(this.divs=Ct(e.divs,t=>{let n=new rh;return n.load(t),n}))}};var Ws="repulse",NC=0,FC=6,BC=3,zC=2,kC=0,VC=0,HC=1,qp=.5,ah=class extends St{constructor(e,t){super(t),this._clickRepulse=()=>{let n=this.container,s=n.actualOptions.interactivity.modes.repulse;if(!s)return;let r=n.repulse??{particles:[]};if(r.finish||(r.count||(r.count=0),r.count++,r.count===n.particles.count&&(r.finish=!0)),r.clicking){let o=n.retina.repulseModeDistance;if(!o||o<NC)return;let a=Math.pow(o/FC,BC),l=n.interactivity.mouse.clickPosition;if(l===void 0)return;let c=new vt(l.x,l.y,a),u=n.particles.quadTree.query(c,h=>this.isEnabled(h));for(let h of u){let{dx:f,dy:p,distance:g}=mt(l,h.position),x=g**zC,m=s.speed,d=-a*m/x;if(x<=a){r.particles.push(h);let v=ht.create(f,p);v.length=d,h.velocity.setTo(v)}}}else if(r.clicking===!1){for(let o of r.particles)o.velocity.setTo(o.initialVelocity);r.particles=[]}},this._hoverRepulse=()=>{let n=this.container,s=n.interactivity.mouse.position,r=n.retina.repulseModeDistance;!r||r<kC||!s||this._processRepulse(s,r,new vt(s.x,s.y,r))},this._processRepulse=(n,s,r,o)=>{let a=this.container,l=a.particles.quadTree.query(r,m=>this.isEnabled(m)),c=a.actualOptions.interactivity.modes.repulse;if(!c)return;let{easing:u,speed:h,factor:f,maxSpeed:p}=c,g=this._engine.getEasing(u),x=(o?.speed??h)*f;for(let m of l){let{dx:d,dy:v,distance:M}=mt(m.position,n),y=At(g(HC-M/s)*x,VC,p),A=ht.create(M?d/M*y:x,M?v/M*y:x);m.position.addTo(A)}},this._singleSelectorRepulse=(n,s)=>{let r=this.container,o=r.actualOptions.interactivity.modes.repulse;if(!o)return;let a=document.querySelectorAll(n);a.length&&a.forEach(l=>{let c=l,u=r.retina.pixelRatio,h={x:(c.offsetLeft+c.offsetWidth*qp)*u,y:(c.offsetTop+c.offsetHeight*qp)*u},f=c.offsetWidth*qp*u,p=s.type===tn.circle?new vt(h.x,h.y,f):new zt(c.offsetLeft*u,c.offsetTop*u,c.offsetWidth*u,c.offsetHeight*u),g=o.divs,x=ac(g,c);this._processRepulse(h,f,p,x)})},this._engine=e,t.repulse||(t.repulse={particles:[]}),this.handleClickMode=n=>{let s=this.container.actualOptions,r=s.interactivity.modes.repulse;if(!r||n!==Ws)return;t.repulse||(t.repulse={particles:[]});let o=t.repulse;o.clicking=!0,o.count=0;for(let a of t.repulse.particles)this.isEnabled(a)&&a.velocity.setTo(a.initialVelocity);o.particles=[],o.finish=!1,setTimeout(()=>{t.destroyed||(o.clicking=!1)},r.duration*1e3)}}clear(){}init(){let e=this.container,t=e.actualOptions.interactivity.modes.repulse;t&&(e.retina.repulseModeDistance=t.distance*e.retina.pixelRatio)}interact(){let e=this.container,t=e.actualOptions,n=e.interactivity.status===mi,s=t.interactivity.events,r=s.onHover,o=r.enable,a=r.mode,l=s.onClick,c=l.enable,u=l.mode,h=s.onDiv;n&&o&&Qe(Ws,a)?this._hoverRepulse():c&&Qe(Ws,u)?this._clickRepulse():jr(Ws,h,(f,p)=>this._singleSelectorRepulse(f,p))}isEnabled(e){let t=this.container,n=t.actualOptions,s=t.interactivity.mouse,r=(e?.interactivity??n.interactivity).events,o=r.onDiv,a=r.onHover,l=r.onClick,c=Jr(Ws,o);if(!(c||a.enable&&s.position||l.enable&&s.clickPosition))return!1;let u=a.mode,h=l.mode;return Qe(Ws,u)||Qe(Ws,h)||c}loadModeOptions(e,...t){e.repulse||(e.repulse=new oh);for(let n of t)e.repulse.load(n?.repulse)}reset(){}};async function D_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalRepulse",t=>Promise.resolve(new ah(i,t)),e)}var lh=class{constructor(){this.factor=3,this.radius=200}load(e){N(e)||(e.factor!==void 0&&(this.factor=e.factor),e.radius!==void 0&&(this.radius=e.radius))}};var GC="slow",WC=0,ch=class extends St{constructor(e){super(e)}clear(e,t,n){e.slow.inRange&&!n||(e.slow.factor=1)}init(){let e=this.container,t=e.actualOptions.interactivity.modes.slow;t&&(e.retina.slowModeRadius=t.radius*e.retina.pixelRatio)}interact(){}isEnabled(e){let t=this.container,n=t.interactivity.mouse,s=(e?.interactivity??t.actualOptions.interactivity).events;return s.onHover.enable&&!!n.position&&Qe(GC,s.onHover.mode)}loadModeOptions(e,...t){e.slow||(e.slow=new lh);for(let n of t)e.slow.load(n?.slow)}reset(e){e.slow.inRange=!1;let t=this.container,n=t.actualOptions,s=t.interactivity.mouse.position,r=t.retina.slowModeRadius,o=n.interactivity.modes.slow;if(!o||!r||r<WC||!s)return;let a=e.getPosition(),l=xt(s,a),c=l/r,u=o.factor,{slow:h}=e;l>r||(h.inRange=!0,h.factor=c/u)}};async function L_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("externalSlow",t=>Promise.resolve(new ch(t)),e)}var XC=0,qC=1,YC=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;function $C(i,e,t){let{svgData:n}=i;if(!n)return"";let s=as(e,t);if(n.includes("fill"))return n.replace(YC,()=>s);let r=n.indexOf(">");return`${n.substring(XC,r)} fill="${s}"${n.substring(r)}`}async function ho(i){return new Promise(e=>{i.loading=!0;let t=new Image;i.element=t,t.addEventListener("load",()=>{i.loading=!1,e()}),t.addEventListener("error",()=>{i.element=void 0,i.error=!0,i.loading=!1,Ai().error(`${It} loading image: ${i.source}`),e()}),t.src=i.source})}async function O_(i){if(i.type!=="svg"){await ho(i);return}i.loading=!0;let e=await fetch(i.source);e.ok?i.svgData=await e.text():(Ai().error(`${It} Image not found`),i.error=!0),i.loading=!1}function U_(i,e,t,n){let s=$C(i,t,n.opacity?.value??qC),r={color:t,gif:e.gif,data:{...i,svgData:s},loaded:!1,ratio:e.width/e.height,replaceColor:e.replaceColor,source:e.src};return new Promise(o=>{let a=new Blob([s],{type:"image/svg+xml"}),l=URL||window.URL||window.webkitURL||window,c=l.createObjectURL(a),u=new Image;u.addEventListener("load",()=>{r.loaded=!0,r.element=u,o(r),l.revokeObjectURL(c)});let h=async()=>{l.revokeObjectURL(c);let f={...i,error:!1,loading:!0};await ho(f),r.loaded=!0,r.element=f.element,o(r)};u.addEventListener("error",()=>{h()}),u.src=c})}var uh=[0,4,2,1],Yp=[8,8,4,2];var hh=class{constructor(e){this.pos=0,this.data=new Uint8ClampedArray(e)}getString(e){let t=this.data.slice(this.pos,this.pos+e);return this.pos+=t.length,t.reduce((n,s)=>n+String.fromCharCode(s),"")}nextByte(){return this.data[this.pos++]}nextTwoBytes(){return this.pos+=2,this.data[this.pos-2]+(this.data[this.pos-1]<<8)}readSubBlocks(){let e="",t=0,n=0,s=0;do{t=this.data[this.pos++];for(let r=t;--r>=n;e+=String.fromCharCode(this.data[this.pos++]));}while(t!==s);return e}readSubBlocksBin(){let e=this.data[this.pos],t=0,n=0,s=1;for(let o=0;e!==n;o+=e+s,e=this.data[this.pos+o])t+=e;let r=new Uint8Array(t);e=this.data[this.pos++];for(let o=0;e!==n;e=this.data[this.pos++])for(let a=e;--a>=n;r[o++]=this.data[this.pos++]);return r}skipSubBlocks(){for(let e=1,t=0;this.data[this.pos]!==t;this.pos+=this.data[this.pos]+e);this.pos++}};var Ri;(function(i){i[i.Replace=0]="Replace",i[i.Combine=1]="Combine",i[i.RestoreBackground=2]="RestoreBackground",i[i.RestorePrevious=3]="RestorePrevious",i[i.UndefinedA=4]="UndefinedA",i[i.UndefinedB=5]="UndefinedB",i[i.UndefinedC=6]="UndefinedC",i[i.UndefinedD=7]="UndefinedD"})(Ri||(Ri={}));var rn;(function(i){i[i.Extension=33]="Extension",i[i.ApplicationExtension=255]="ApplicationExtension",i[i.GraphicsControlExtension=249]="GraphicsControlExtension",i[i.PlainTextExtension=1]="PlainTextExtension",i[i.CommentExtension=254]="CommentExtension",i[i.Image=44]="Image",i[i.EndOfFile=59]="EndOfFile"})(rn||(rn={}));var ai={x:0,y:0},ZC=0,N_=.5,KC=0,F_=0,$p=0;function B_(i,e){let t=[];for(let n=0;n<e;n++)t.push({r:i.data[i.pos],g:i.data[i.pos+1],b:i.data[i.pos+2]}),i.pos+=3;return t}function JC(i,e,t,n){switch(i.nextByte()){case rn.GraphicsControlExtension:{let s=e.frames[t(!1)];i.pos++;let r=i.nextByte();s.GCreserved=(r&224)>>>5,s.disposalMethod=(r&28)>>>2,s.userInputDelayFlag=(r&2)===2;let o=(r&1)===1;s.delayTime=i.nextTwoBytes()*10;let a=i.nextByte();o&&n(a),i.pos++;break}case rn.ApplicationExtension:{i.pos++;let s={identifier:i.getString(8),authenticationCode:i.getString(3),data:i.readSubBlocksBin()};e.applicationExtensions.push(s);break}case rn.CommentExtension:{e.comments.push([t(!1),i.readSubBlocks()]);break}case rn.PlainTextExtension:{if(e.globalColorTable.length===0)throw new EvalError("plain text extension without global color table");i.pos++,e.frames[t(!1)].plainTextData={left:i.nextTwoBytes(),top:i.nextTwoBytes(),width:i.nextTwoBytes(),height:i.nextTwoBytes(),charSize:{width:i.nextTwoBytes(),height:i.nextTwoBytes()},foregroundColor:i.nextByte(),backgroundColor:i.nextByte(),text:i.readSubBlocks()};break}default:i.skipSubBlocks();break}}async function jC(i,e,t,n,s,r){let o=e.frames[n(!0)];o.left=i.nextTwoBytes(),o.top=i.nextTwoBytes(),o.width=i.nextTwoBytes(),o.height=i.nextTwoBytes();let a=i.nextByte(),l=(a&128)===128,c=(a&64)===64;o.sortFlag=(a&32)===32,o.reserved=(a&24)>>>3;let u=1<<(a&7)+1;l&&(o.localColorTable=B_(i,u));let h=d=>{let{r:v,g:M,b:y}=(l?o.localColorTable:e.globalColorTable)[d];return d!==s(null)?{r:v,g:M,b:y,a:255}:{r:v,g:M,b:y,a:t?~~((v+M+y)/3):0}},f=(()=>{try{return new ImageData(o.width,o.height,{colorSpace:"srgb"})}catch(d){if(d instanceof DOMException&&d.name==="IndexSizeError")return null;throw d}})();if(f==null)throw new EvalError("GIF frame size is to large");let p=i.nextByte(),g=i.readSubBlocksBin(),x=1<<p,m=(d,v)=>{let M=d>>>3,y=d&7;return(g[M]+(g[M+1]<<8)+(g[M+2]<<16)&(1<<v)-1<<y)>>>y};if(c){for(let d=0,v=p+1,M=0,y=[[0]],A=0;A<4;A++){if(uh[A]<o.height){let T=0,R=0,C=!1;for(;!C;){let S=d;if(d=m(M,v),M+=v+1,d===x){v=p+1,y.length=x+2;for(let _=0;_<y.length;_++)y[_]=_<x?[_]:[]}else{d>=y.length?y.push(y[S].concat(y[S][0])):S!==x&&y.push(y[S].concat(y[d][0]));for(let _ of y[d]){let{r:P,g:H,b:k,a:X}=h(_);f.data.set([P,H,k,X],uh[A]*o.width+Yp[A]*R+T%(o.width*4)),T+=4}y.length===1<<v&&v<12&&v++}T===o.width*4*(R+1)&&(R++,uh[A]+Yp[A]*R>=o.height&&(C=!0))}}r?.(i.pos/(i.data.length-1),n(!1)+1,f,{x:o.left,y:o.top},{width:e.width,height:e.height})}o.image=f,o.bitmap=await createImageBitmap(f)}else{let d=0,v=p+1,M=0,y=-4,A=!1,T=[[0]];for(;!A;){let R=d;if(d=m(M,v),M+=v,d===x){v=p+1,T.length=x+2;for(let C=0;C<T.length;C++)T[C]=C<x?[C]:[]}else{if(d===x+1){A=!0;break}d>=T.length?T.push(T[R].concat(T[R][0])):R!==x&&T.push(T[R].concat(T[d][0]));for(let C of T[d]){let{r:S,g:_,b:P,a:H}=h(C);f.data.set([S,_,P,H],y+=4)}T.length>=1<<v&&v<12&&v++}}o.image=f,o.bitmap=await createImageBitmap(f),r?.((i.pos+1)/i.data.length,n(!1)+1,o.image,{x:o.left,y:o.top},{width:e.width,height:e.height})}}async function QC(i,e,t,n,s,r){switch(i.nextByte()){case rn.EndOfFile:return!0;case rn.Image:await jC(i,e,t,n,s,r);break;case rn.Extension:JC(i,e,n,s);break;default:throw new EvalError("undefined block found")}return!1}function eR(i){for(let e of i.applicationExtensions)if(e.identifier+e.authenticationCode==="NETSCAPE2.0")return e.data[1]+(e.data[2]<<8);return NaN}async function tR(i,e,t){t||(t=!1);let n=await fetch(i);if(!n.ok&&n.status===404)throw new EvalError("file not found");let s=await n.arrayBuffer(),r={width:0,height:0,totalTime:0,colorRes:0,pixelAspectRatio:0,frames:[],sortFlag:!1,globalColorTable:[],backgroundImage:new ImageData(1,1,{colorSpace:"srgb"}),comments:[],applicationExtensions:[]},o=new hh(new Uint8ClampedArray(s));if(o.getString(6)!=="GIF89a")throw new Error("not a supported GIF file");r.width=o.nextTwoBytes(),r.height=o.nextTwoBytes();let a=o.nextByte(),l=(a&128)===128;r.colorRes=(a&112)>>>4,r.sortFlag=(a&8)===8;let c=1<<(a&7)+1,u=o.nextByte();r.pixelAspectRatio=o.nextByte(),r.pixelAspectRatio!==0&&(r.pixelAspectRatio=(r.pixelAspectRatio+15)/64),l&&(r.globalColorTable=B_(o,c));let h=(()=>{try{return new ImageData(r.width,r.height,{colorSpace:"srgb"})}catch(y){if(y instanceof DOMException&&y.name==="IndexSizeError")return null;throw y}})();if(h==null)throw new Error("GIF frame size is to large");let{r:f,g:p,b:g}=r.globalColorTable[u];h.data.set(l?[f,p,g,255]:[0,0,0,0]);for(let y=4;y<h.data.length;y*=2)h.data.copyWithin(y,0,y);r.backgroundImage=h;let x=-1,m=!0,d=-1,v=y=>(y&&(m=!0),x),M=y=>(y!=null&&(d=y),d);try{do m&&(r.frames.push({left:0,top:0,width:0,height:0,disposalMethod:Ri.Replace,image:new ImageData(1,1,{colorSpace:"srgb"}),plainTextData:null,userInputDelayFlag:!1,delayTime:0,sortFlag:!1,localColorTable:[],reserved:0,GCreserved:0}),x++,d=-1,m=!1);while(!await QC(o,r,t,v,M,e));r.frames.length--;for(let y of r.frames){if(y.userInputDelayFlag&&y.delayTime===0){r.totalTime=1/0;break}r.totalTime+=y.delayTime}return r}catch(y){throw y instanceof EvalError?new Error(`error while parsing frame ${x} "${y.message}"`):y}}function z_(i){let{context:e,radius:t,particle:n,delta:s}=i,r=n.image;if(!r?.gifData||!r.gif)return;let o=new OffscreenCanvas(r.gifData.width,r.gifData.height),a=o.getContext("2d");if(!a)throw new Error("could not create offscreen canvas context");a.imageSmoothingQuality="low",a.imageSmoothingEnabled=!1,a.clearRect(ai.x,ai.y,o.width,o.height),n.gifLoopCount===void 0&&(n.gifLoopCount=r.gifLoopCount??$p);let l=n.gifFrame??ZC,c={x:-r.gifData.width*N_,y:-r.gifData.height*N_},u=r.gifData.frames[l];if(n.gifTime===void 0&&(n.gifTime=KC),!!u.bitmap){switch(e.scale(t/r.gifData.width,t/r.gifData.height),u.disposalMethod){case Ri.UndefinedA:case Ri.UndefinedB:case Ri.UndefinedC:case Ri.UndefinedD:case Ri.Replace:a.drawImage(u.bitmap,u.left,u.top),e.drawImage(o,c.x,c.y),a.clearRect(ai.x,ai.y,o.width,o.height);break;case Ri.Combine:a.drawImage(u.bitmap,u.left,u.top),e.drawImage(o,c.x,c.y);break;case Ri.RestoreBackground:a.drawImage(u.bitmap,u.left,u.top),e.drawImage(o,c.x,c.y),a.clearRect(ai.x,ai.y,o.width,o.height),r.gifData.globalColorTable.length?a.putImageData(r.gifData.backgroundImage,c.x,c.y):a.putImageData(r.gifData.frames[F_].image,c.x+u.left,c.y+u.top);break;case Ri.RestorePrevious:{let h=a.getImageData(ai.x,ai.y,o.width,o.height);a.drawImage(u.bitmap,u.left,u.top),e.drawImage(o,c.x,c.y),a.clearRect(ai.x,ai.y,o.width,o.height),a.putImageData(h,ai.x,ai.y)}break}if(n.gifTime+=s.value,n.gifTime>u.delayTime){if(n.gifTime-=u.delayTime,++l>=r.gifData.frames.length){if(--n.gifLoopCount<=$p)return;l=F_,a.clearRect(ai.x,ai.y,o.width,o.height)}n.gifFrame=l}e.scale(r.gifData.width/t,r.gifData.height/t)}}async function k_(i){if(i.type!=="gif"){await ho(i);return}i.loading=!0;try{i.gifData=await tR(i.source),i.gifLoopCount=eR(i.gifData)??$p,i.gifLoopCount||(i.gifLoopCount=1/0)}catch{i.error=!0}i.loading=!1}var iR=2,nR=1,sR=12,rR=1,fh=class{constructor(e){this.validTypes=["image","images"],this.loadImageShape=async t=>{if(!this._engine.loadImage)throw new Error(`${It} image shape not initialized`);await this._engine.loadImage({gif:t.gif,name:t.name,replaceColor:t.replaceColor??!1,src:t.src})},this._engine=e}addImage(e){this._engine.images||(this._engine.images=[]),this._engine.images.push(e)}draw(e){let{context:t,radius:n,particle:s,opacity:r}=e,o=s.image,a=o?.element;if(o){if(t.globalAlpha=r,o.gif&&o.gifData)z_(e);else if(a){let l=o.ratio,c={x:-n,y:-n},u=n*iR;t.drawImage(a,c.x,c.y,u,u/l)}t.globalAlpha=nR}}getSidesCount(){return sR}async init(e){let t=e.actualOptions;if(!(!t.preload||!this._engine.loadImage))for(let n of t.preload)await this._engine.loadImage(n)}loadShape(e){if(e.shape!=="image"&&e.shape!=="images")return;this._engine.images||(this._engine.images=[]);let t=e.shapeData;if(!t)return;this._engine.images.find(s=>s.name===t.name||s.source===t.src)||this.loadImageShape(t).then(()=>{this.loadShape(e)})}particleInit(e,t){if(t.shape!=="image"&&t.shape!=="images")return;this._engine.images||(this._engine.images=[]);let n=this._engine.images,s=t.shapeData;if(!s)return;let r=t.getFillColor(),o=n.find(l=>l.name===s.name||l.source===s.src);if(!o)return;let a=s.replaceColor??o.replaceColor;if(o.loading){setTimeout(()=>{this.particleInit(e,t)});return}(async()=>{let l;o.svgData&&r?l=await U_(o,s,r,t):l={color:r,data:o,element:o.element,gif:o.gif,gifData:o.gifData,gifLoopCount:o.gifLoopCount,loaded:!0,ratio:s.width&&s.height?s.width/s.height:o.ratio??rR,replaceColor:a,source:s.src},l.ratio||(l.ratio=1);let c=s.fill??t.shapeFill,u=s.close??t.shapeClose,h={image:l,fill:c,close:u};t.image=h.image,t.shapeFill=h.fill,t.shapeClose=h.close})()}};var dh=class{constructor(){this.src="",this.gif=!1}load(e){N(e)||(e.gif!==void 0&&(this.gif=e.gif),e.height!==void 0&&(this.height=e.height),e.name!==void 0&&(this.name=e.name),e.replaceColor!==void 0&&(this.replaceColor=e.replaceColor),e.src!==void 0&&(this.src=e.src),e.width!==void 0&&(this.width=e.width))}};var ph=class{constructor(e){this.id="imagePreloader",this._engine=e}async getPlugin(){return await Promise.resolve(),{}}loadOptions(e,t){if(!t?.preload)return;e.preload||(e.preload=[]);let n=e.preload;for(let s of t.preload){let r=n.find(o=>o.name===s.name||o.src===s.src);if(r)r.load(s);else{let o=new dh;o.load(s),n.push(o)}}}needsPlugin(){return!0}};var oR=3;function aR(i){i.loadImage||(i.loadImage=async e=>{if(!e.name&&!e.src)throw new Error(`${It} no image source provided`);if(i.images||(i.images=[]),!i.images.find(t=>t.name===e.name||t.source===e.src))try{let t={gif:e.gif??!1,name:e.name??e.src,source:e.src,type:e.src.substring(e.src.length-oR),error:!1,loading:!0,replaceColor:e.replaceColor,ratio:e.width&&e.height?e.width/e.height:void 0};i.images.push(t);let n;e.gif?n=k_:n=e.replaceColor?O_:ho,await n(t)}catch{throw new Error(`${It} ${e.name??e.src} not found`)}})}async function V_(i,e=!0){ae(i,"3.7.1"),aR(i);let t=new ph(i);await i.addPlugin(t,e),await i.addShape(new fh(i),e)}var mh=class extends Qt{constructor(){super(),this.sync=!1}load(e){N(e)||(super.load(e),e.sync!==void 0&&(this.sync=e.sync))}};var gh=class extends Qt{constructor(){super(),this.sync=!1}load(e){N(e)||(super.load(e),e.sync!==void 0&&(this.sync=e.sync))}};var xh=class{constructor(){this.count=0,this.delay=new mh,this.duration=new gh}load(e){N(e)||(e.count!==void 0&&(this.count=e.count),this.delay.load(e.delay),this.duration.load(e.duration))}};var fo=0,lR=-1,H_=0,G_=0;function W_(i,e,t){if(!i.life)return;let n=i.life,s=!1;if(i.spawning)if(n.delayTime+=e.value,n.delayTime>=i.life.delay)s=!0,i.spawning=!1,n.delayTime=fo,n.time=fo;else return;if(n.duration===lR||i.spawning||(s?n.time=fo:n.time+=e.value,n.time<n.duration))return;if(n.time=fo,i.life.count>H_&&i.life.count--,i.life.count===H_){i.destroy();return}let r=Ae(G_,t.width),o=Ae(G_,t.width);i.position.x=Bt(r),i.position.y=Bt(o),i.spawning=!0,n.delayTime=fo,n.time=fo,i.reset();let a=i.options.life;a&&(n.delay=ie(a.delay.value)*1e3,n.duration=ie(a.duration.value)*1e3)}var Xs=0,X_=1,q_=-1,yh=class{constructor(e){this.container=e}init(e){let t=this.container,n=e.options,s=n.life;s&&(e.life={delay:t.retina.reduceFactor?ie(s.delay.value)*(s.delay.sync?X_:ke())/t.retina.reduceFactor*1e3:Xs,delayTime:Xs,duration:t.retina.reduceFactor?ie(s.duration.value)*(s.duration.sync?X_:ke())/t.retina.reduceFactor*1e3:Xs,time:Xs,count:s.count},e.life.duration<=Xs&&(e.life.duration=q_),e.life.count<=Xs&&(e.life.count=q_),e.life&&(e.spawning=e.life.delay>Xs))}isEnabled(e){return!e.destroyed}loadOptions(e,...t){e.life||(e.life=new xh);for(let n of t)e.life.load(n?.life)}update(e,t){!this.isEnabled(e)||!e.life||W_(e,t,this.container.canvas.size)}};async function Y_(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("life",async t=>Promise.resolve(new yh(t)),e)}function $_(i){let{context:e,particle:t,radius:n}=i,s=t.shapeData,r=0;e.moveTo(-n,r),e.lineTo(n,r),e.lineCap=s?.cap??"butt"}var cR=1,vh=class{constructor(){this.validTypes=["line"]}draw(e){$_(e)}getSidesCount(){return cR}};async function Z_(i,e=!0){ae(i,"3.7.1"),await i.addShape(new vh,e)}var K_=.5,_h=class{init(){}isEnabled(e){return!en()&&!e.destroyed&&e.container.actualOptions.interactivity.events.onHover.parallax.enable}move(e){let t=e.container,n=t.actualOptions,s=n.interactivity.events.onHover.parallax;if(en()||!s.enable)return;let r=s.force,o=t.interactivity.mouse.position;if(!o)return;let a=t.canvas.size,l={x:a.width*K_,y:a.height*K_},c=s.smooth,u=e.getRadius()/r,h={x:(o.x-l.x)*u,y:(o.y-l.y)*u},{offset:f}=e;f.x+=(h.x-f.x)/c,f.y+=(h.y-f.y)/c}};async function J_(i,e=!0){ae(i,"3.7.1"),await i.addMover("parallax",()=>Promise.resolve(new _h),e)}var j_=1e3,uR=1,bh=class extends fs{constructor(e){super(e)}clear(){}init(){}interact(e){let t=this.container;e.attractDistance===void 0&&(e.attractDistance=ie(e.options.move.attract.distance)*t.retina.pixelRatio);let n=e.attractDistance,s=e.getPosition(),r=t.particles.quadTree.queryCircle(s,n);for(let o of r){if(e===o||!o.options.move.attract.enable||o.destroyed||o.spawning)continue;let a=o.getPosition(),{dx:l,dy:c}=mt(s,a),u=e.options.move.attract.rotate,h=l/(u.x*j_),f=c/(u.y*j_),p=o.size.value/e.size.value,g=uR/p;e.velocity.x-=h*p,e.velocity.y-=f*p,o.velocity.x+=h*g,o.velocity.y+=f*g}}isEnabled(e){return e.options.move.attract.enable}reset(){}};async function Q_(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("particlesAttract",t=>Promise.resolve(new bh(t)),e)}var hR=.5,fR=10,dR=0;function e0(i,e,t,n,s,r){let o=At(i.options.collisions.absorb.speed*s.factor/fR,dR,n);i.size.value+=o*hR,t.size.value-=o,n<=r&&(t.size.value=0,t.destroy())}function t0(i,e,t,n){let s=i.getRadius(),r=e.getRadius();s===void 0&&r!==void 0?i.destroy():s!==void 0&&r===void 0?e.destroy():s!==void 0&&r!==void 0&&(s>=r?e0(i,s,e,r,t,n):e0(e,r,i,s,t,n))}var i0=i=>{i.collisionMaxSpeed===void 0&&(i.collisionMaxSpeed=ie(i.options.collisions.maxSpeed)),i.velocity.length>i.collisionMaxSpeed&&(i.velocity.length=i.collisionMaxSpeed)};function Mh(i,e){lc($o(i),$o(e)),i0(i),i0(e)}function n0(i,e){!i.unbreakable&&!e.unbreakable&&Mh(i,e),i.getRadius()===void 0&&e.getRadius()!==void 0?i.destroy():i.getRadius()!==void 0&&e.getRadius()===void 0?e.destroy():i.getRadius()!==void 0&&e.getRadius()!==void 0&&(i.getRadius()>=e.getRadius()?e:i).destroy()}function s0(i,e,t,n){switch(i.options.collisions.mode){case hs.absorb:{t0(i,e,t,n);break}case hs.bounce:{Mh(i,e);break}case hs.destroy:{n0(i,e);break}}}var pR=2,Sh=class extends fs{constructor(e){super(e)}clear(){}init(){}interact(e,t){if(e.destroyed||e.spawning)return;let n=this.container,s=e.getPosition(),r=e.getRadius(),o=n.particles.quadTree.queryCircle(s,r*pR);for(let a of o){if(e===a||!a.options.collisions.enable||e.options.collisions.mode!==a.options.collisions.mode||a.destroyed||a.spawning)continue;let l=a.getPosition(),c=a.getRadius();if(Math.abs(Math.round(s.z)-Math.round(l.z))>r+c)continue;let u=xt(s,l),h=r+c;u>h||s0(e,a,t,n.retina.pixelRatio)}}isEnabled(e){return e.options.collisions.enable}reset(){}};async function r0(i,e=!0){ae(i,"3.7.1"),await i.addInteractor("particlesCollisions",t=>Promise.resolve(new Sh(t)),e)}var Zp=2,wh=class extends vt{constructor(e,t,n,s){super(e,t,n),this.canvasSize=s,this.canvasSize={...s}}contains(e){let{width:t,height:n}=this.canvasSize,{x:s,y:r}=e;return super.contains(e)||super.contains({x:s-t,y:r})||super.contains({x:s-t,y:r-n})||super.contains({x:s,y:r-n})}intersects(e){if(super.intersects(e))return!0;let t=e,n=e,s={x:e.position.x-this.canvasSize.width,y:e.position.y-this.canvasSize.height};if(n.radius!==void 0){let r=new vt(s.x,s.y,n.radius*Zp);return super.intersects(r)}else if(t.size!==void 0){let r=new zt(s.x,s.y,t.size.width*Zp,t.size.height*Zp);return super.intersects(r)}return!1}};var Th=class{constructor(){this.blur=5,this.color=new ot,this.color.value="#000",this.enable=!1}load(e){N(e)||(e.blur!==void 0&&(this.blur=e.blur),this.color=ot.create(this.color,e.color),e.enable!==void 0&&(this.enable=e.enable))}};var Eh=class{constructor(){this.enable=!1,this.frequency=1}load(e){N(e)||(e.color!==void 0&&(this.color=ot.create(this.color,e.color)),e.enable!==void 0&&(this.enable=e.enable),e.frequency!==void 0&&(this.frequency=e.frequency),e.opacity!==void 0&&(this.opacity=e.opacity))}};var Ah=class{constructor(){this.blink=!1,this.color=new ot,this.color.value="#fff",this.consent=!1,this.distance=100,this.enable=!1,this.frequency=1,this.opacity=1,this.shadow=new Th,this.triangles=new Eh,this.width=1,this.warp=!1}load(e){N(e)||(e.id!==void 0&&(this.id=e.id),e.blink!==void 0&&(this.blink=e.blink),this.color=ot.create(this.color,e.color),e.consent!==void 0&&(this.consent=e.consent),e.distance!==void 0&&(this.distance=e.distance),e.enable!==void 0&&(this.enable=e.enable),e.frequency!==void 0&&(this.frequency=e.frequency),e.opacity!==void 0&&(this.opacity=e.opacity),this.shadow.load(e.shadow),this.triangles.load(e.triangles),e.width!==void 0&&(this.width=e.width),e.warp!==void 0&&(this.warp=e.warp))}};var o0=2,mR=1,Ch={x:0,y:0},gR=0;function xR(i,e,t,n,s){let{dx:r,dy:o,distance:a}=mt(i,e);if(!s||a<=t)return a;let l={x:Math.abs(r),y:Math.abs(o)},c={x:Math.min(l.x,n.width-l.x),y:Math.min(l.y,n.height-l.y)};return Math.sqrt(c.x**o0+c.y**o0)}var Rh=class extends fs{constructor(e,t){super(e),this._setColor=n=>{if(!n.options.links)return;let s=this._linkContainer,r=n.options.links,o=r.id===void 0?s.particles.linksColor:s.particles.linksColors.get(r.id);if(o)return;let a=r.color;o=pc(this._engine,a,r.blink,r.consent),r.id===void 0?s.particles.linksColor=o:s.particles.linksColors.set(r.id,o)},this._linkContainer=e,this._engine=t}clear(){}init(){this._linkContainer.particles.linksColor=void 0,this._linkContainer.particles.linksColors=new Map}interact(e){if(!e.options.links)return;e.links=[];let t=e.getPosition(),n=this.container,s=n.canvas.size;if(t.x<Ch.x||t.y<Ch.y||t.x>s.width||t.y>s.height)return;let r=e.options.links,o=r.opacity,a=e.retina.linksDistance??gR,l=r.warp,c;l?c=new wh(t.x,t.y,a,s):c=new vt(t.x,t.y,a);let u=n.particles.quadTree.query(c);for(let h of u){let f=h.options.links;if(e===h||!f?.enable||r.id!==f.id||h.spawning||h.destroyed||!h.links||e.links.some(m=>m.destination===h)||h.links.some(m=>m.destination===e))continue;let p=h.getPosition();if(p.x<Ch.x||p.y<Ch.y||p.x>s.width||p.y>s.height)continue;let g=xR(t,p,a,s,l&&f.warp);if(g>a)continue;let x=(mR-g/a)*o;this._setColor(e),e.links.push({destination:h,opacity:x})}}isEnabled(e){return!!e.options.links?.enable}loadParticlesOptions(e,...t){e.links||(e.links=new Ah);for(let n of t)e.links.load(n?.links)}reset(){}};async function a0(i,e=!0){await i.addInteractor("particlesLinks",async t=>Promise.resolve(new Rh(t,i)),e)}function yR(i,e,t,n){i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.lineTo(n.x,n.y),i.closePath()}function l0(i){let e=!1,{begin:t,end:n,engine:s,maxDistance:r,context:o,canvasSize:a,width:l,backgroundMask:c,colorLine:u,opacity:h,links:f}=i;if(xt(t,n)<=r)ls(o,t,n),e=!0;else if(f.warp){let g,x,m={x:n.x-a.width,y:n.y},d=mt(t,m);if(d.distance<=r){let v=t.y-d.dy/d.dx*t.x;g={x:0,y:v},x={x:a.width,y:v}}else{let v={x:n.x,y:n.y-a.height},M=mt(t,v);if(M.distance<=r){let A=-(t.y-M.dy/M.dx*t.x)/(M.dy/M.dx);g={x:A,y:0},x={x:A,y:a.height}}else{let y={x:n.x-a.width,y:n.y-a.height},A=mt(t,y);if(A.distance<=r){let T=t.y-A.dy/A.dx*t.x;g={x:-T/(A.dy/A.dx),y:T},x={x:g.x+a.width,y:g.y+a.height}}}}g&&x&&(ls(o,t,g),ls(o,n,x),e=!0)}if(!e)return;o.lineWidth=l,c.enable&&(o.globalCompositeOperation=c.composite),o.strokeStyle=ri(u,h);let{shadow:p}=f;if(p.enable){let g=jt(s,p.color);g&&(o.shadowBlur=p.blur,o.shadowColor=ri(g))}o.stroke()}function c0(i){let{context:e,pos1:t,pos2:n,pos3:s,backgroundMask:r,colorTriangle:o,opacityTriangle:a}=i;yR(e,t,n,s),r.enable&&(e.globalCompositeOperation=r.composite),e.fillStyle=ri(o,a),e.fill()}function vR(i){return i.sort((e,t)=>e-t),i.join("_")}function Kp(i,e){let t=vR(i.map(s=>s.id)),n=e.get(t);return n===void 0&&(n=ke(),e.set(t,n)),n}var u0=0,Jp=0,h0=0,_R=.5,bR=1,Ph=class{constructor(e,t){this._drawLinkLine=(n,s)=>{let r=n.options.links;if(!r?.enable)return;let o=this._container,a=o.actualOptions,l=s.destination,c=n.getPosition(),u=l.getPosition(),h=s.opacity;o.canvas.draw(f=>{let p,g=n.options.twinkle?.lines;if(g?.enable){let v=g.frequency,M=jt(this._engine,g.color);ke()<v&&M&&(p=M,h=ie(g.opacity))}if(!p){let v=r.id!==void 0?o.particles.linksColors.get(r.id):o.particles.linksColor;p=Ko(n,l,v)}if(!p)return;let x=n.retina.linksWidth??Jp,m=n.retina.linksDistance??h0,{backgroundMask:d}=a;l0({context:f,width:x,begin:c,end:u,engine:this._engine,maxDistance:m,canvasSize:o.canvas.size,links:r,backgroundMask:d,colorLine:p,opacity:h})})},this._drawLinkTriangle=(n,s,r)=>{let o=n.options.links;if(!o?.enable)return;let a=o.triangles;if(!a.enable)return;let l=this._container,c=l.actualOptions,u=s.destination,h=r.destination,f=a.opacity??(s.opacity+r.opacity)*_R;f<=u0||l.canvas.draw(p=>{let g=n.getPosition(),x=u.getPosition(),m=h.getPosition(),d=n.retina.linksDistance??h0;if(xt(g,x)>d||xt(m,x)>d||xt(m,g)>d)return;let v=jt(this._engine,a.color);if(!v){let M=o.id!==void 0?l.particles.linksColors.get(o.id):l.particles.linksColor;v=Ko(n,u,M)}v&&c0({context:p,pos1:g,pos2:x,pos3:m,backgroundMask:c.backgroundMask,colorTriangle:v,opacityTriangle:f})})},this._drawTriangles=(n,s,r,o)=>{let a=r.destination;if(!(n.links?.triangles.enable&&a.options.links?.triangles.enable))return;let l=a.links?.filter(c=>{let u=this._getLinkFrequency(a,c.destination);return a.options.links&&u<=a.options.links.frequency&&o.findIndex(f=>f.destination===c.destination)>=0});if(l?.length)for(let c of l){let u=c.destination;this._getTriangleFrequency(s,a,u)>n.links.triangles.frequency||this._drawLinkTriangle(s,r,c)}},this._getLinkFrequency=(n,s)=>Kp([n,s],this._freqs.links),this._getTriangleFrequency=(n,s,r)=>Kp([n,s,r],this._freqs.triangles),this._container=e,this._engine=t,this._freqs={links:new Map,triangles:new Map}}drawParticle(e,t){let{links:n,options:s}=t;if(!n?.length)return;let r=n.filter(o=>s.links&&(s.links.frequency>=bR||this._getLinkFrequency(t,o.destination)<=s.links.frequency));for(let o of r)this._drawTriangles(s,t,o,r),o.opacity>u0&&(t.retina.linksWidth??Jp)>Jp&&this._drawLinkLine(t,o)}async init(){this._freqs.links=new Map,this._freqs.triangles=new Map,await Promise.resolve()}particleCreated(e){if(e.links=[],!e.options.links)return;let t=this._container.retina.pixelRatio,{retina:n}=e,{distance:s,width:r}=e.options.links;n.linksDistance=s*t,n.linksWidth=r*t}particleDestroyed(e){e.links=[]}};var Ih=class{constructor(e){this.id="links",this._engine=e}getPlugin(e){return Promise.resolve(new Ph(e,this._engine))}loadOptions(){}needsPlugin(){return!0}};async function f0(i,e=!0){let t=new Ih(i);await i.addPlugin(t,e)}async function d0(i,e=!0){ae(i,"3.7.1"),await a0(i,e),await f0(i,e)}var MR=180,Dh={x:0,y:0},SR=2;function p0(i,e,t){let{context:n}=i,s=t.count.numerator*t.count.denominator,r=t.count.numerator/t.count.denominator,o=MR*(r-SR)/r,a=Math.PI-Ei(o);if(n){n.beginPath(),n.translate(e.x,e.y),n.moveTo(Dh.x,Dh.y);for(let l=0;l<s;l++)n.lineTo(t.length,Dh.y),n.translate(t.length,Dh.y),n.rotate(a)}}var wR=5,po=class{draw(e){let{particle:t,radius:n}=e,s=this.getCenter(t,n),r=this.getSidesData(t,n);p0(e,s,r)}getSidesCount(e){let t=e.shapeData;return Math.round(ie(t?.sides??wR))}};var m0=3.5,g0=2.66,TR=3,Lh=class extends po{constructor(){super(...arguments),this.validTypes=["polygon"]}getCenter(e,t){return{x:-t/(e.sides/m0),y:-t/(g0/m0)}}getSidesData(e,t){let n=e.sides;return{count:{denominator:1,numerator:n},length:t*g0/(n/TR)}}};var ER=1.66,AR=3,CR=2,Oh=class extends po{constructor(){super(...arguments),this.validTypes=["triangle"]}getCenter(e,t){return{x:-t,y:t/ER}}getSidesCount(){return AR}getSidesData(e,t){let n=t*CR;return{count:{denominator:2,numerator:3},length:n}}};async function RR(i,e=!0){ae(i,"3.7.1"),await i.addShape(new Lh,e)}async function PR(i,e=!0){ae(i,"3.7.1"),await i.addShape(new Oh,e)}async function x0(i,e=!0){ae(i,"3.7.1"),await RR(i,e),await PR(i,e)}var Uh=class{constructor(){this.enable=!1,this.speed=0,this.decay=0,this.sync=!1}load(e){N(e)||(e.enable!==void 0&&(this.enable=e.enable),e.speed!==void 0&&(this.speed=Ae(e.speed)),e.decay!==void 0&&(this.decay=Ae(e.decay)),e.sync!==void 0&&(this.sync=e.sync))}};var Nh=class extends Qt{constructor(){super(),this.animation=new Uh,this.direction=ei.clockwise,this.path=!1,this.value=0}load(e){N(e)||(super.load(e),e.direction!==void 0&&(this.direction=e.direction),this.animation.load(e.animation),e.path!==void 0&&(this.path=e.path))}};var y0=2,IR=Math.PI*y0,DR=1,LR=360,Fh=class{constructor(e){this.container=e}init(e){let t=e.options.rotate;if(!t)return;e.rotate={enable:t.animation.enable,value:Ei(ie(t.value)),min:0,max:IR},e.pathRotation=t.path;let n=t.direction;switch(n===ei.random&&(n=Math.floor(ke()*y0)>0?ei.counterClockwise:ei.clockwise),n){case ei.counterClockwise:case"counterClockwise":e.rotate.status=yt.decreasing;break;case ei.clockwise:e.rotate.status=yt.increasing;break}let s=t.animation;s.enable&&(e.rotate.decay=DR-ie(s.decay),e.rotate.velocity=ie(s.speed)/LR*this.container.retina.reduceFactor,s.sync||(e.rotate.velocity*=ke())),e.rotation=e.rotate.value}isEnabled(e){let t=e.options.rotate;return t?!e.destroyed&&!e.spawning&&(!!t.value||t.animation.enable||t.path):!1}loadOptions(e,...t){e.rotate||(e.rotate=new Nh);for(let n of t)e.rotate.load(n?.rotate)}update(e,t){this.isEnabled(e)&&(e.isRotating=!!e.rotate,e.rotate&&(Qr(e,e.rotate,!1,Vi.none,t),e.rotation=e.rotate.value))}};async function v0(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("rotate",t=>Promise.resolve(new Fh(t)),e)}var OR=Math.sqrt(2),UR=2;function _0(i){let{context:e,radius:t}=i,n=t/OR,s=n*UR;e.rect(-n,-n,s,s)}var NR=4,Bh=class{constructor(){this.validTypes=["edge","square"]}draw(e){_0(e)}getSidesCount(){return NR}};async function b0(i,e=!0){ae(i,"3.7.1"),await i.addShape(new Bh,e)}var mo={x:0,y:0};function M0(i){let{context:e,particle:t,radius:n}=i,s=t.sides,r=t.starInset??2;e.moveTo(mo.x,mo.y-n);for(let o=0;o<s;o++)e.rotate(Math.PI/s),e.lineTo(mo.x,mo.y-n*r),e.rotate(Math.PI/s),e.lineTo(mo.x,mo.y-n)}var FR=2,BR=5,zh=class{constructor(){this.validTypes=["star"]}draw(e){M0(e)}getSidesCount(e){let t=e.shapeData;return Math.round(ie(t?.sides??BR))}particleInit(e,t){let n=t.shapeData;t.starInset=ie(n?.inset??FR)}};async function S0(i,e=!0){ae(i,"3.7.1"),await i.addShape(new zh,e)}var zR=1,kh=class{constructor(e,t){this._container=e,this._engine=t}init(e){let t=this._container,n=e.options,s=Xt(n.stroke,e.id,n.reduceDuplicates);e.strokeWidth=ie(s.width)*t.retina.pixelRatio,e.strokeOpacity=ie(s.opacity??zR),e.strokeAnimation=s.color?.animation;let r=Rn(this._engine,s.color)??e.getFillColor();r&&(e.strokeColor=mc(r,e.strokeAnimation,t.retina.reduceFactor))}isEnabled(e){let t=e.strokeAnimation,{strokeColor:n}=e;return!e.destroyed&&!e.spawning&&!!t&&(n?.h.value!==void 0&&n.h.enable||n?.s.value!==void 0&&n.s.enable||n?.l.value!==void 0&&n.l.enable)}update(e,t){this.isEnabled(e)&&gc(e.strokeColor,t)}};async function w0(i,e=!0){ae(i,"3.7.1"),await i.addParticleUpdater("strokeColor",t=>Promise.resolve(new kh(t,i)),e)}async function kR(i,e=!0){ae(i,"3.7.1"),await J_(i,!1),await f_(i,!1),await y_(i,!1),await b_(i,!1),await E_(i,!1),await C_(i,!1),await R_(i,!1),await P_(i,!1),await I_(i,!1),await D_(i,!1),await L_(i,!1),await Q_(i,!1),await r0(i,!1),await d0(i,!1),await s_(i,!1),await a_(i,!1),await V_(i,!1),await Z_(i,!1),await x0(i,!1),await b0(i,!1),await S0(i,!1),await Y_(i,!1),await v0(i,!1),await w0(i,!1),await n_(i,e)}export{vf as AdditiveBlending,Zt as BackSide,hi as BufferAttribute,di as BufferGeometry,Ye as Color,Pd as EdgesGeometry,Ts as Group,Id as IcosahedronGeometry,el as LineBasicMaterial,Ed as LineLoop,Td as LineSegments,Db as MathUtils,_i as Mesh,Po as MeshBasicMaterial,ii as PerspectiveCamera,Cd as Points,sl as PointsMaterial,wd as Scene,Fi as ShaderMaterial,Dd as SphereGeometry,Sd as WebGLRenderer,Ty as animate,Gy as inView,kR as loadSlim,Hy as scroll,Wy as stagger,Uv as tsParticles};
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
