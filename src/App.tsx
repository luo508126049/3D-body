import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  Bookmark,
  Crosshair,
  Eye,
  HeartPulse,
  LocateFixed,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { acupoints, Acupoint, meridians, Meridian, searchAcupoints } from './acupoints';

function BodyModel({
  selected,
  points,
  onSelect,
}: {
  selected: Acupoint;
  points: Acupoint[];
  onSelect: (point: Acupoint) => void;
}) {
  const meridianLines = useMemo(() => {
    const grouped = new Map<Meridian, Acupoint[]>();
    points.forEach((point) => {
      grouped.set(point.meridian, [...(grouped.get(point.meridian) ?? []), point]);
    });
    return [...grouped.values()].filter((group) => group.length > 1);
  }, [points]);

  return (
    <group scale={0.78} position={[0, -0.1, 0]}>
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshPhysicalMaterial color="#9ad8de" transparent opacity={0.38} roughness={0.3} transmission={0.2} />
      </mesh>
      <mesh position={[0, 0.95, 0]} scale={[0.5, 0.88, 0.28]}>
        <capsuleGeometry args={[0.58, 1.12, 16, 48]} />
        <meshPhysicalMaterial color="#72c6d1" transparent opacity={0.3} roughness={0.22} />
      </mesh>
      <mesh position={[-0.6, 0.95, 0]} rotation={[0.08, 0, -0.28]} scale={[0.13, 0.92, 0.13]}>
        <capsuleGeometry args={[0.35, 1.25, 12, 32]} />
        <meshPhysicalMaterial color="#6fc4cd" transparent opacity={0.32} />
      </mesh>
      <mesh position={[0.6, 0.95, 0]} rotation={[0.08, 0, 0.28]} scale={[0.13, 0.92, 0.13]}>
        <capsuleGeometry args={[0.35, 1.25, 12, 32]} />
        <meshPhysicalMaterial color="#6fc4cd" transparent opacity={0.32} />
      </mesh>
      <mesh position={[-0.23, -0.25, 0]} rotation={[0.02, 0, 0.08]} scale={[0.17, 1.15, 0.16]}>
        <capsuleGeometry args={[0.36, 1.45, 12, 36]} />
        <meshPhysicalMaterial color="#6fc4cd" transparent opacity={0.32} />
      </mesh>
      <mesh position={[0.23, -0.25, 0]} rotation={[0.02, 0, -0.08]} scale={[0.17, 1.15, 0.16]}>
        <capsuleGeometry args={[0.36, 1.45, 12, 36]} />
        <meshPhysicalMaterial color="#6fc4cd" transparent opacity={0.32} />
      </mesh>

      {meridianLines.map((line) => (
        <group key={line[0].meridian}>
          {line.map((point, index) => {
            const next = line[index + 1];
            if (!next) return null;
            return (
              <Line
                key={`${point.id}-${next.id}`}
                points={[point.position, next.position]}
                color={point.color}
                lineWidth={2}
                transparent
                opacity={0.38}
              />
            );
          })}
        </group>
      ))}

      {points.map((point) => {
        const isSelected = selected.id === point.id;
        return (
          <group key={point.id} position={point.position}>
            <mesh onClick={(event) => { event.stopPropagation(); onSelect(point); }} scale={isSelected ? 1.38 : 1}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={isSelected ? 1.8 : 0.8} />
            </mesh>
            <mesh scale={isSelected ? 2.2 : 1.45}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshBasicMaterial color={point.color} transparent opacity={isSelected ? 0.24 : 0.12} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Scene({
  selected,
  points,
  onSelect,
}: {
  selected: Acupoint;
  points: Acupoint[];
  onSelect: (point: Acupoint) => void;
}) {
  return (
    <Canvas shadows dpr={[1, 1.75]}>
      <PerspectiveCamera makeDefault position={[0, 0.62, 5.8]} fov={42} />
      <color attach="background" args={['#071114']} />
      <fog attach="fog" args={['#071114', 4, 8]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={2.8} />
      <pointLight position={[-2, 1, 3]} color="#00d9ff" intensity={2} />
      <pointLight position={[2, 2, 2]} color="#ffd166" intensity={0.7} />
      <gridHelper args={[4.4, 24, '#27535a', '#153238']} position={[0, -1.48, 0]} />
      <BodyModel selected={selected} points={points} onSelect={onSelect} />
      <OrbitControls target={[0, 0.35, 0]} enablePan={false} minDistance={3.8} maxDistance={6.8} minPolarAngle={0.6} maxPolarAngle={2.1} />
    </Canvas>
  );
}

export function App() {
  const [query, setQuery] = useState('');
  const [selectedMeridians, setSelectedMeridians] = useState<Meridian[]>([]);
  const [selected, setSelected] = useState<Acupoint>(acupoints[0]);
  const filteredPoints = useMemo(() => searchAcupoints(query, selectedMeridians), [query, selectedMeridians]);

  const toggleMeridian = (meridian: Meridian) => {
    setSelectedMeridians((current) =>
      current.includes(meridian) ? current.filter((item) => item !== meridian) : [...current, meridian],
    );
  };

  const visiblePoints = filteredPoints.length > 0 ? filteredPoints : acupoints;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><HeartPulse size={20} /></span>
          <span>3D 穴位图谱</span>
        </div>
        <nav className="tabs" aria-label="主导航">
          <button className="tab active">穴位</button>
          <button className="tab">经络</button>
          <button className="tab">收藏</button>
        </nav>
        <div className="view-tools" aria-label="视图工具">
          <button title="正面视图"><Eye size={18} /></button>
          <button title="重置旋转"><RotateCcw size={18} /></button>
          <button title="显示设置"><SlidersHorizontal size={18} /></button>
        </div>
      </header>

      <section className="workspace">
        <aside className="left-panel">
          <label className="search-field">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索穴位 / 症状 / 经络"
            />
          </label>
          <div className="panel-section">
            <div className="section-title">经络筛选</div>
            <div className="meridian-list">
              {meridians.map((meridian) => (
                <button
                  className={selectedMeridians.includes(meridian) ? 'meridian active' : 'meridian'}
                  key={meridian}
                  onClick={() => toggleMeridian(meridian)}
                >
                  <span />
                  {meridian}
                </button>
              ))}
            </div>
          </div>
          <div className="panel-section result-section">
            <div className="section-title">匹配穴位</div>
            <div className="result-list">
              {filteredPoints.map((point) => (
                <button
                  key={point.id}
                  className={selected.id === point.id ? 'result active' : 'result'}
                  onClick={() => setSelected(point)}
                >
                  <span className="point-dot" style={{ background: point.color }} />
                  <span>
                    <strong>{point.name}</strong>
                    <small>{point.code} · {point.meridian}</small>
                  </span>
                </button>
              ))}
              {filteredPoints.length === 0 && <p className="empty">没有匹配结果，已在模型中显示全部穴位。</p>}
            </div>
          </div>
        </aside>

        <section className="model-stage" aria-label="3D 人体穴位模型">
          <div className="stage-overlay">
            <div>
              <strong>{selected.name}</strong>
              <span>{selected.code} · {selected.meridian}</span>
            </div>
            <button onClick={() => setSelected(acupoints[0])}><LocateFixed size={16} /> 一键聚焦</button>
          </div>
          <Scene selected={selected} points={visiblePoints} onSelect={setSelected} />
          <div className="bottom-strip">
            {visiblePoints.slice(0, 6).map((point) => (
              <button key={point.id} className={selected.id === point.id ? 'mini-point active' : 'mini-point'} onClick={() => setSelected(point)}>
                <span style={{ background: point.color }} />
                {point.name}
              </button>
            ))}
          </div>
        </section>

        <aside className="right-panel">
          <div className="detail-head">
            <div>
              <p>{selected.pinyin}</p>
              <h1>{selected.name} {selected.code}</h1>
              <span>{selected.meridian} · {selected.region}</span>
            </div>
            <button title="加入收藏"><Bookmark size={19} /></button>
          </div>
          <div className="detail-actions">
            <button><Crosshair size={16} /> 一键聚焦</button>
            <button><Sparkles size={16} /> 加入收藏</button>
          </div>
          <article className="info-block">
            <h2>定位</h2>
            <p>{selected.location}</p>
          </article>
          <article className="info-block">
            <h2>主治</h2>
            <div className="tag-list">
              {selected.indications.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
          <article className="info-block">
            <h2>取穴提示</h2>
            <p>点击模型中的发光点可切换穴位；拖拽画布旋转人体，滚轮缩放观察局部区域。</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
