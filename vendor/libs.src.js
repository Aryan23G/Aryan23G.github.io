// Source for vendor/libs.js. Rebuild with:
//   npx esbuild vendor/libs.src.js --bundle --minify --format=esm --outfile=vendor/libs.js
// (deps: three@0.170.0, motion@11.15.0, @tsparticles/engine@3.7.1, @tsparticles/slim@3.7.1)
export {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Points, LineLoop,
  IcosahedronGeometry, SphereGeometry, BufferGeometry, BufferAttribute, EdgesGeometry, LineSegments,
  MeshBasicMaterial, ShaderMaterial, PointsMaterial, LineBasicMaterial,
  AdditiveBlending, BackSide, Color, MathUtils
} from 'three';
export { animate, inView, scroll, stagger } from 'motion';
export { tsParticles } from '@tsparticles/engine';
export { loadSlim } from '@tsparticles/slim';
