import { useEffect, useRef } from "react";

const SpiderCursor = () => {
  const canvasRef = useRef(null);
  let isCursorMoving = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;
    const { sin, cos, PI, hypot, min, max } = Math;
    
    const resizeCanvas = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    function spawn() {
      const pts = many(333, () => ({ x: rnd(w), y: rnd(h), len: 0, r: 0 }));
      const pts2 = many(9, (i) => ({ x: cos((i / 9) * PI * 2), y: sin((i / 9) * PI * 2) }));
      let seed = rnd(100);
      let tx = rnd(w), ty = rnd(h), x = rnd(w), y = rnd(h);
      let kx = rnd(0.5, 0.2), ky = rnd(0.5, 0.2);
      let walkRadius = pt(rnd(5), rnd(5));
      let r = w / rnd(100, 150);
      
      function paintPt(pt) {
        pts2.forEach((pt2) => {
          if (!pt.len) return;
          drawNoisyLine(
            lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
            lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
            x + pt2.x * r,
            y + pt2.y * r
          );
        });
        drawCircle(pt.x, pt.y, pt.r);
      }
      
      return {
        follow(mx, my) {
          tx = mx;
          ty = my;
          isCursorMoving = true;
        },
        tick(t) {
          if (!isCursorMoving) {
            tx += cos(t * kx + seed) * 2;
            ty += sin(t * ky + seed) * 2;
          }
          
          const fx = tx + cos(t * kx + seed) * walkRadius.x;
          const fy = ty + sin(t * ky + seed) * walkRadius.y;
          x += (fx - x) * 0.05;
          y += (fy - y) * 0.05;
          let i = 0;
          pts.forEach((pt) => {
            const dx = pt.x - x, dy = pt.y - y;
            const len = hypot(dx, dy);
            let r = min(2, w / len / 5);
            pt.t = 0;
            const increasing = len < w / 10 && i++ < 8;
            let dir = increasing ? 0.1 : -0.1;
            if (increasing) r *= 1.5;
            pt.r = r;
            pt.len = max(0, min(pt.len + dir, 1));
            paintPt(pt);
          });
        },
      };
    }
    
    const spiders = many(2, spawn);
    
    window.addEventListener("pointermove", (e) => {
      isCursorMoving = true;
      spiders.forEach(spider => spider.follow(e.clientX, e.clientY));
      clearTimeout(cursorTimeout);
      cursorTimeout = setTimeout(() => isCursorMoving = false, 500);
    });

    let cursorTimeout;
    
    function animate(t) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = ctx.strokeStyle = "#c2c2c2";
      t /= 1000;
      spiders.forEach(spider => spider.tick(t));
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />;
};

function rnd(x = 1, dx = 0) {
  return Math.random() * x + dx;
}
function pt(x, y) {
  return { x, y };
}
function many(n, f) {
  return [...Array(n)].map((_, i) => f(i));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function drawCircle(x, y, r) {
  const ctx = document.querySelector("canvas").getContext("2d");
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
  ctx.fill();
}
function drawNoisyLine(x0, y0, x1, y1) {
  const ctx = document.querySelector("canvas").getContext("2d");
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  
  let steps = 10;
  for (let i = 1; i <= steps; i++) {
    let t = i / steps;
    let nx = lerp(x0, x1, t) + (Math.random() - 1.5) * 5;
    let ny = lerp(y0, y1, t) + (Math.random() - 1.5) * 5;
    ctx.lineTo(nx, ny);
  }
  
  ctx.lineWidth = 2;
  ctx.stroke();
}

export default SpiderCursor;