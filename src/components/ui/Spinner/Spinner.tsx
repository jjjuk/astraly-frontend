import styles from './Spinner.module.scss'

export const Spinner = ({ color, size }: { color?: string; size?: string }) => {
  const sizePx = size === 'sm' ? 18 : size === 'lg' ? 36 : 24
  const borderWidth = size === 'sm' ? '2px' : size === 'lg' ? '3px' : '2px'
  const parentStyle = {
    height: `${sizePx}px`,
    width: `${sizePx}px`,
  }
  const divStyle = {
    borderColor: color
      ? `${color} transparent transparent transparent`
      : '#9D69DE transparent transparent transparent',
    height: `${sizePx * 0.8}px`,
    width: `${sizePx * 0.8}px`,
    borderWidth,
    margin: '2px',
  }

  return (
    <div className={styles.ldsRing} style={parentStyle}>
      <div style={divStyle}></div>
      <div style={divStyle}></div>
    </div>
  )
}

export default Spinner
