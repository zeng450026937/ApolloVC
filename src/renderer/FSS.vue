<template>
  <div id="container">
    <div id="output"
    style="overflow: hidden"
    class="layer"
    v-on:click="onMouseClick"
    v-on:mousemove="onMouseMove">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import FSS from '../assets/fss';
import Debug from 'common/Debug';

const debug = Debug('Vue:FSS');

const MESH = {
  width    : 1.2,
  height   : 1.2,
  depth    : 5,
  segments : 16,
  slices   : 8,
  xRange   : 0.8,
  yRange   : 0.1,
  zRange   : 1.0,
  ambient  : '#555555',
  diffuse  : '#FFFFFF',
  speed    : 0.002
};
const LIGHT = {
  count       : 2,
  xyScalar    : 1,
  zOffset     : 100,
  ambient     : '#880066',
  diffuse     : '#FF8800',
  speed       : 0.001,
  gravity     : 1200,
  dampening   : 0.95,
  minLimit    : 10,
  maxLimit    : null,
  minDistance : 20,
  maxDistance : 400,
  autopilot   : true,
  draw        : true,
  bounds      : FSS.Vector3.create(),
  step        : FSS.Vector3.create(
    Math.randomInRange(0.2, 1.0),
    Math.randomInRange(0.2, 1.0),
    Math.randomInRange(0.2, 1.0)
  )
};
const RENDERER = {
  WEBGL    : 'webgl',
  CANVAS   : 'canvas',
  SVG      : 'svg',
  renderer : 'webgl'
};

export default {
  // property
  name       : 'FSS',
  components : {},
  data() {
    return {
      now            : Date.now(),
      start          : Date.now(),
      center         : undefined,
      attractor      : undefined,
      container      : undefined,
      output         : undefined,
      webglRenderer  : undefined,
      canvasRenderer : undefined,
      svgRenderer    : undefined,
      renderer       : undefined,
      scene          : undefined,
      geometry       : undefined,
      material       : undefined,
      mesh           : undefined
    };
  },
  // computed value
  computed : {
    duration() {
      return Date.now() - this.now;
    }
  },
  // lifecycle
  beforeCreate() {
    debug('beforeCreate');
  },
  created() {
    debug('created');
  },
  beforeMount() {
    debug('beforeMount');
  },
  mounted() {
    debug('mounted');

    this.center = FSS.Vector3.create();
    this.attractor = FSS.Vector3.create();
    this.container = document.getElementById('container');
    this.output = document.getElementById('output');

    this.createRenderer();
    this.createScene();
    this.createMesh();
    this.createLights();
    this.resize(this.output.offsetWidth, this.output.offsetHeight);
    this.animate();

    window.addEventListener('resize', this.onWindowResize);
  },
  beforeUpdate() {
    debug('beforeUpdate');
  },
  updated() {
    debug('updated');
  },
  beforeDestroy() {
    debug('beforeDestroy');
  },
  destroyed() {
    debug('destroyed');
  },
  methods : {
    createRenderer() {
      this.webglRenderer = new FSS.WebGLRenderer();
      this.canvasRenderer = new FSS.CanvasRenderer();
      this.svgRenderer = new FSS.SVGRenderer();
      this.setRenderer(RENDERER.renderer);
    },
    setRenderer(type) {
      if (this.renderer) {
        this.output.removeChild(this.renderer.element);
      }
      switch (type) {
        case RENDERER.WEBGL:
          this.renderer = this.webglRenderer;
          break;
        case RENDERER.CANVAS:
          this.renderer = this.canvasRenderer;
          break;
        case RENDERER.SVG:
          this.renderer = this.svgRenderer;
          break;
      }
      this.renderer.setSize(this.output.offsetWidth, this.output.offsetHeight);
      this.output.appendChild(this.renderer.element);
    },
    createScene() {
      this.scene = new FSS.Scene();
    },
    createMesh() {
      this.scene.remove(this.mesh);
      this.renderer.clear();
      this.geometry = new FSS.Plane(
        MESH.width * this.renderer.width,
        MESH.height * this.renderer.height,
        MESH.segments,
        MESH.slices
      );
      this.material = new FSS.Material(MESH.ambient, MESH.diffuse);
      this.mesh = new FSS.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      // Augment vertices for animation
      let v, vertex;

      for (v = this.geometry.vertices.length - 1; v >= 0; v--) {
        vertex = this.geometry.vertices[v];
        vertex.anchor = FSS.Vector3.clone(vertex.position);
        vertex.step = FSS.Vector3.create(
          Math.randomInRange(0.2, 1.0),
          Math.randomInRange(0.2, 1.0),
          Math.randomInRange(0.2, 1.0)
        );
        vertex.time = Math.randomInRange(0, Math.PIM2);
      }
    },
    createLights() {
      let l, light;

      for (l = this.scene.lights.length - 1; l >= 0; l--) {
        light = this.scene.lights[l];
        this.scene.remove(light);
      }
      this.renderer.clear();
      for (l = 0; l < LIGHT.count; l++) {
        light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
        light.ambientHex = light.ambient.format();
        light.diffuseHex = light.diffuse.format();
        this.scene.add(light);

        // Augment light for animation
        light.mass = Math.randomInRange(0.5, 1);
        light.velocity = FSS.Vector3.create();
        light.acceleration = FSS.Vector3.create();
        light.force = FSS.Vector3.create();

        // Ring SVG Circle
        light.ring = document.createElementNS(FSS.SVGNS, 'circle');
        light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
        light.ring.setAttributeNS(null, 'stroke-width', '0.5');
        light.ring.setAttributeNS(null, 'fill', 'none');
        light.ring.setAttributeNS(null, 'r', '10');

        // Core SVG Circle
        light.core = document.createElementNS(FSS.SVGNS, 'circle');
        light.core.setAttributeNS(null, 'fill', light.diffuseHex);
        light.core.setAttributeNS(null, 'r', '4');
      }
    },
    resize(width, height) {
      this.renderer.setSize(width, height);
      FSS.Vector3.set(this.center, this.renderer.halfWidth, this.renderer.halfHeight);
      this.createMesh();
    },
    animate() {
      this.now = Date.now() - this.start;
      this.update();
      this.render();
      requestAnimationFrame(this.animate);
    },
    update() {
      /* eslint-disable prefer-const */
      let ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;
      /* eslint-enable prefer-const */

      // Update Bounds
      FSS.Vector3.copy(LIGHT.bounds, this.center);
      FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

      // Update Attractor
      FSS.Vector3.setZ(this.attractor, LIGHT.zOffset);

      // Overwrite the Attractor position
      if (LIGHT.autopilot) {
        ox = Math.sin(LIGHT.step[0] * this.now * LIGHT.speed);
        oy = Math.cos(LIGHT.step[1] * this.now * LIGHT.speed);
        FSS.Vector3.set(this.attractor,
          LIGHT.bounds[0]*ox,
          LIGHT.bounds[1]*oy,
          LIGHT.zOffset);
      }

      // Animate Lights
      for (l = this.scene.lights.length - 1; l >= 0; l--) {
        light = this.scene.lights[l];

        // Reset the z position of the light
        FSS.Vector3.setZ(light.position, LIGHT.zOffset);

        // Calculate the force Luke!
        const D = Math.clamp(
          FSS.Vector3.distanceSquared(light.position, this.attractor),
          LIGHT.minDistance,
          LIGHT.maxDistance
        );
        const F = LIGHT.gravity * light.mass / D;

        FSS.Vector3.subtractVectors(light.force, this.attractor, light.position);
        FSS.Vector3.normalise(light.force);
        FSS.Vector3.multiplyScalar(light.force, F);

        // Update the light position
        FSS.Vector3.set(light.acceleration);
        FSS.Vector3.add(light.acceleration, light.force);
        FSS.Vector3.add(light.velocity, light.acceleration);
        FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
        FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
        FSS.Vector3.add(light.position, light.velocity);
      }

      // Animate Vertices
      for (v = this.geometry.vertices.length - 1; v >= 0; v--) {
        vertex = this.geometry.vertices[v];
        ox = Math.sin(vertex.time + (vertex.step[0] * this.now * MESH.speed));
        oy = Math.cos(vertex.time + (vertex.step[1] * this.now * MESH.speed));
        oz = Math.sin(vertex.time + (vertex.step[2] * this.now * MESH.speed));
        FSS.Vector3.set(vertex.position,
          MESH.xRange*this.geometry.segmentWidth*ox,
          MESH.yRange*this.geometry.sliceHeight*oy,
          (MESH.zRange*offset*oz) - offset
        );
        FSS.Vector3.add(vertex.position, vertex.anchor);
      }

      // Set the Geometry to dirty
      this.geometry.dirty = true;
    },
    render() {
      this.renderer.render(this.scene);

      // Draw Lights
      if (LIGHT.draw) {
        let l, lx, ly, light;

        for (l = this.scene.lights.length - 1; l >= 0; l--) {
          light = this.scene.lights[l];
          lx = light.position[0];
          ly = light.position[1];
          switch (RENDERER.renderer) {
            case RENDERER.CANVAS:
              this.renderer.context.lineWidth = 0.5;
              this.renderer.context.beginPath();
              this.renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
              this.renderer.context.strokeStyle = light.ambientHex;
              this.renderer.context.stroke();
              this.renderer.context.beginPath();
              this.renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
              this.renderer.context.fillStyle = light.diffuseHex;
              this.renderer.context.fill();
              break;
            case RENDERER.SVG:
              lx += this.renderer.halfWidth;
              ly = this.renderer.halfHeight - ly;
              light.core.setAttributeNS(null, 'fill', light.diffuseHex);
              light.core.setAttributeNS(null, 'cx', lx);
              light.core.setAttributeNS(null, 'cy', ly);
              this.renderer.element.appendChild(light.core);
              light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
              light.ring.setAttributeNS(null, 'cx', lx);
              light.ring.setAttributeNS(null, 'cy', ly);
              this.renderer.element.appendChild(light.ring);
              break;
          }
        }
      }
    },
    onMouseClick(event) {
      FSS.Vector3.set(this.attractor, event.x, this.renderer.height - event.y);
      FSS.Vector3.subtract(this.attractor, this.center);
      LIGHT.autopilot = !LIGHT.autopilot;
    },
    onMouseMove(event) {
      FSS.Vector3.set(this.attractor, event.x, this.renderer.height - event.y);
      FSS.Vector3.subtract(this.attractor, this.center);
    },
    onWindowResize() {
      this.resize(this.output.offsetWidth, this.output.offsetHeight);
      this.render();
    }
  }
};
</script>

<style>
.layer {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
</style>

