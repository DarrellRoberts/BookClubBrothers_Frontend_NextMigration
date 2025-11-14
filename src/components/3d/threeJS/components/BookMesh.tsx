import { PresentationControls } from "@react-three/drei"
import React from "react"

type Props = {
  book: {
    scene: any
  }
  id: string
  height: number
  showTablet: boolean
  showMobile: boolean
  handleClick: (e) => void
}

const BookMesh = ({
  book,
  id,
  height,
  showTablet,
  showMobile,
  handleClick,
}: Props) => (
  <mesh
    key={id}
    name={id}
    position={[0, height, -0.5]}
    rotation={[0, 4.75, 0.45]}
    onClick={handleClick}
  >
    <PresentationControls>
      <primitive
        scale={[
          showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
          showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
          showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
        ]}
        object={book?.scene}
      />
    </PresentationControls>
  </mesh>
)
export default React.memo(BookMesh)
