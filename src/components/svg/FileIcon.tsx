import * as React from "react"
import { SVGProps } from "react"

const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26.013 0H4.633v40h30.733V9.422L26.013 0Zm.475 2.79 6.11 6.153h-6.11V2.79ZM6.262 38.371V1.628H24.86v8.943h8.878v27.8H6.262v.001Z"
      fill="#000"
    />
    <path
      d="M22.608 8.943H9.381v1.628h13.227V8.943ZM30.62 16.402H9.38v1.628h21.238v-1.628ZM30.62 23.86H9.38v1.628h21.238V23.86ZM30.62 31.319H9.38v1.628h21.238v-1.629Z"
      fill="#000"
    />
  </svg>
)

export default FileIcon
