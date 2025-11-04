import { useLoader } from "@react-three/fiber"

const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader

export const useBookModels = (renderIds: string[]) => {
  const paths = renderIds?.map((id) => `/book-model/${id}/scene.gltf`)
  const models = useLoader(GLTFLoader, paths)
  return models
}
