type Props = { tipo?: string; color?: string; className?: string };
export default function Prenda({ tipo = "", color = "#193ee9", className = "" }: Props) {
  const texto = tipo.toLowerCase();
  const buzo = /buzo|hoodie|campera/.test(texto);
  const gorra = /gorra/.test(texto);
  return <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
    <ellipse cx="200" cy="355" rx="112" ry="15" fill="#101b36" opacity=".09" />
    {gorra ? <g>
      <path d="M100 231 Q100 104 211 105 Q303 108 307 245 L103 245Z" fill={color} />
      <path d="M103 235 Q202 199 308 238 L357 276 Q225 309 103 265Z" fill={color} stroke="#fff" strokeOpacity=".2" strokeWidth="2" />
      <path d="M207 108 Q174 174 185 225" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="2" />
      <text x="207" y="202" textAnchor="middle" fill="white" fontFamily="Arial" fontWeight="900" fontSize="25">PT.</text>
    </g> : <g>
      {buzo && <path d="M150 93 Q146 40 200 36 Q254 40 250 93 L229 124 H172Z" fill={color} stroke="#111" strokeOpacity=".15" strokeWidth="3" />}
      <path d={buzo ? "M145 87 L76 117 L34 281 L91 297 L126 194 L122 339 Q200 356 278 339 L274 194 L309 297 L366 281 L324 117 L255 87 L230 105 Q200 126 170 105Z" : "M145 84 L67 119 L31 194 L102 229 L126 181 L122 337 Q200 350 278 337 L274 181 L298 229 L369 194 L333 119 L255 84 L230 101 Q200 121 170 101Z"} fill={color} />
      <path d="M145 85 Q200 151 255 85" fill="none" stroke="#080d20" strokeOpacity=".2" strokeWidth="8" />
      <path d="M129 328 Q200 340 271 328 M75 188 L104 204 M296 204 L325 188" fill="none" stroke="white" strokeOpacity=".15" strokeWidth="3" />
      <path d="M143 135 L137 308 M257 135 L263 308" fill="none" stroke="white" strokeOpacity=".06" strokeWidth="6" />
      <text x="200" y="197" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="35" letterSpacing="-2">PILAR</text>
      <text x="200" y="218" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" letterSpacing="5">TECNO</text>
      <text x="200" y="242" textAnchor="middle" fill="white" opacity=".6" fontFamily="monospace" fontSize="8">COMUNIDAD EN MOVIMIENTO</text>
      {buzo && <><path d="M153 270 L247 270 L260 309 H140Z" fill="none" stroke="white" strokeOpacity=".18" strokeWidth="2" /><path d="M181 110 L176 161 M219 110 L224 161" stroke="white" strokeOpacity=".65" strokeWidth="3" /></>}
    </g>}
  </svg>;
}
