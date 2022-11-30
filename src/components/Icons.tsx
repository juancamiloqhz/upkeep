interface SvgProps {
  size?: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const MenuIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 1024 1024"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M27 193.6c-8.2-8.2-12.2-18.6-12.2-31.2s4-23 12.2-31.2S45.6 119 58.2 119h912.4c12.6 0 23 4 31.2 12.2s12.2 18.6 12.2 31.2-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2zm974.8 285.2c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 522.6 14.8 510s4-23 12.2-31.2 18.6-12.2 31.2-12.2h912.4c12.6 0 23 4 31.2 12.2zm0 347.4c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 870 14.8 857.4s4-23 12.2-31.2S45.6 814 58.2 814h912.4c12.6 0 23 4.2 31.2 12.2z"></path>
  </svg>
);

export const CloudDoneIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "22"}
    width={props.size || "22"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0122 15c0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41z"></path>
  </svg>
);

export const AccountCircleIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "32"}
    width={props.size || "32"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
  </svg>
);

export const OutlineSettingsIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "22"}
    width={props.size || "22"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 00-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 00.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
  </svg>
);

export const ViewListIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.1"
    viewBox="0 0 17 17"
    height={props.size || "20"}
    width={props.size || "20"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g></g>
    <path d="M0 0v4h17v-4h-17zM16 3h-15v-2h15v2zM0 10h17v-4h-17v4zM1 7h15v2h-15v-2zM0 16h17v-4h-17v4zM1 13h15v2h-15v-2z"></path>
  </svg>
);

export const ViewGridIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.1"
    viewBox="0 0 17 17"
    height={props.size || "20"}
    width={props.size || "20"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g></g>
    <path d="M0 7h7v-7h-7v7zM1 1h5v5h-5v-5zM10 0v7h7v-7h-7zM16 6h-5v-5h5v5zM0 17h7v-7h-7v7zM1 11h5v5h-5v-5zM10 17h7v-7h-7v7zM11 11h5v5h-5v-5z"></path>
  </svg>
);

export const CheckIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
  </svg>
);

export const CheckSquareIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z"></path>
    <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
  </svg>
);

export const PaintBrushIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.061 22c1.523 0 2.84-.543 3.91-1.613 1.123-1.123 1.707-2.854 1.551-4.494l8.564-8.564a3.123 3.123 0 0 0-.002-4.414c-1.178-1.18-3.234-1.18-4.412 0l-8.884 8.884c-1.913.169-3.807 1.521-3.807 3.919 0 .303.021.588.042.86.08 1.031.109 1.418-1.471 2.208a1.001 1.001 0 0 0-.122 1.717C2.52 20.563 4.623 22 7.061 22c-.001 0-.001 0 0 0zM18.086 4.328a1.144 1.144 0 0 1 1.586.002 1.12 1.12 0 0 1 0 1.584L12 13.586 10.414 12l7.672-7.672zM6.018 16.423c-.018-.224-.037-.458-.037-.706 0-1.545 1.445-1.953 2.21-1.953.356 0 .699.073.964.206.945.475 1.26 1.293 1.357 1.896.177 1.09-.217 2.368-.956 3.107C8.865 19.664 8.049 20 7.061 20H7.06c-.75 0-1.479-.196-2.074-.427 1.082-.973 1.121-1.989 1.032-3.15z"></path>
  </svg>
);

export const SearchIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "24"}
    width={props.size || "24"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

export const FlashOutlineIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.2"
    baseProfile="tiny"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.5 4h.005m-.005 0l-2.5 6 5 2.898-7.5 7.102 2.5-6-5-2.9 7.5-7.1m0-2c-.562.012-1.029.219-1.379.551l-7.497 7.095c-.458.435-.685 1.059-.61 1.686.072.626.437 1.182.982 1.498l3.482 2.021-1.826 4.381c-.362.871-.066 1.879.712 2.416.344.236.739.354 1.135.354.498 0 .993-.186 1.375-.548l7.5-7.103c.458-.434.685-1.058.61-1.685-.073-.627-.438-1.183-.982-1.498l-3.482-2.018 1.789-4.293c.123-.26.192-.551.192-.857 0-1.102-.89-1.996-2.001-2z"></path>
  </svg>
);

export const AlarmIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 4c-4.879 0-9 4.121-9 9s4.121 9 9 9 9-4.121 9-9-4.121-9-9-9zm0 16c-3.794 0-7-3.206-7-7s3.206-7 7-7 7 3.206 7 7-3.206 7-7 7z"></path>
    <path d="M13 12V8h-2v6h6v-2zm4.284-8.293 1.412-1.416 3.01 3-1.413 1.417zm-10.586 0-2.99 2.999L2.29 5.294l2.99-3z"></path>
  </svg>
);

export const CloseIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "20"}
    width={props.size || "20"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
  </svg>
);

export const PlusIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "20"}
    width={props.size || "20"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
  </svg>
);

export const LabelIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path>
  </svg>
);

export const LabelOutlineIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
  </svg>
);

export const EditIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "20"}
    width={props.size || "20"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
  </svg>
);

export const EditOutlineIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

export const ArchiveIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"></path>
    <path d="M14 9h-4v3H7l5 5 5-5h-3z"></path>
  </svg>
);

export const UnarchiveIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m21.706 5.292-2.999-2.999A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.292A.994.994 0 0 0 2 6v13c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6a.994.994 0 0 0-.294-.708zM6.414 4h11.172l1 1H5.414l1-1zM4 19V7h16l.002 12H4z"></path>
    <path d="M7 14h3v3h4v-3h3l-5-5z"></path>
  </svg>
);

export const TrashIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height={props.size || "1em"}
    width={props.size || "1em"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

export const TrashFillIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M128 405.429C128 428.846 147.198 448 170.667 448h170.667C364.802 448 384 428.846 384 405.429V160H128v245.429zM416 96h-80l-26.785-32H202.786L176 96H96v32h320V96z"></path>
  </svg>
);

export const PinIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.2"
    baseProfile="tiny"
    viewBox="0 0 24 24"
    height={props.size || "24"}
    width={props.size || "24"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.729 4.271c-.389-.391-1.021-.393-1.414-.004-.104.104-.176.227-.225.355-.832 1.736-1.748 2.715-2.904 3.293-1.297.64-2.786 1.085-5.186 1.085-.13 0-.26.025-.382.076-.245.102-.439.297-.541.541-.101.244-.101.52 0 .764.051.123.124.234.217.326l3.243 3.243-4.537 6.05 6.05-4.537 3.242 3.242c.092.094.203.166.326.217.122.051.252.078.382.078s.26-.027.382-.078c.245-.102.44-.295.541-.541.051-.121.077-.252.077-.381 0-2.4.444-3.889 1.083-5.166.577-1.156 1.556-2.072 3.293-2.904.129-.049.251-.121.354-.225.389-.393.387-1.025-.004-1.414l-3.997-4.02z"></path>
  </svg>
);

export const PinOutlineIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    version="1.2"
    baseProfile="tiny"
    viewBox="0 0 24 24"
    height={props.size || "24"}
    width={props.size || "24"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.436 7.586l-3.998-4.02c-.752-.756-2.063-.764-2.83-.006-.196.196-.35.436-.418.629-.653 1.362-1.354 2.215-2.254 2.727l-.217.105c-.968.485-2.285.979-4.719.979-.266 0-.521.052-.766.152-.484.202-.879.595-1.082 1.084-.199.484-.199 1.041 0 1.525.104.249.25.471.435.651l3.235 3.235-3.822 5.353 5.352-3.822 3.227 3.227c.186.189.406.339.656.441.247.103.503.154.766.154s.519-.052.765-.154c.498-.205.883-.592 1.08-1.078.103-.242.155-.507.155-.768 0-2.436.494-3.752.978-4.721.496-.992 1.369-1.748 2.754-2.414.271-.104.51-.256.711-.457.772-.782.768-2.051-.008-2.822zm-5.248 4.801c-.819 1.643-1.188 3.37-1.195 5.604l-7.993-7.991c2.139 0 3.814-.335 5.396-1.084l.235-.105c1.399-.699 2.468-1.893 3.388-3.834l3.924 4.051c-1.863.893-3.056 1.96-3.755 3.359z"></path>
  </svg>
);

export const BellPlusIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 7.037h-2V10H8.037v2H11v2.963h2V12h2.963v-2H13z"></path>
    <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path>
  </svg>
);

export const OutlineUserPlusIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
    ></path>
  </svg>
);

export const OutlineColorPaletteIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0112 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 00-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 012.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"></path>
    <circle cx="6.5" cy="11.5" r="1.5"></circle>
    <circle cx="9.5" cy="7.5" r="1.5"></circle>
    <circle cx="14.5" cy="7.5" r="1.5"></circle>
    <circle cx="17.5" cy="11.5" r="1.5"></circle>
  </svg>
);

export const ImageAddIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
    <path d="m8 11-3 4h11l-4-6-3 4z"></path>
    <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
  </svg>
);

export const MoreVerticalIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
);

export const UndoIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path>
  </svg>
);

export const RedoIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path>
  </svg>
);

export const DropletOffIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height={props.size || "32"}
    width={props.size || "32"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <desc></desc>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M8.454 8.458l-1.653 2.545a6 6 0 0 0 10.32 6.123"></path>
    <path d="M18 14a5.971 5.971 0 0 0 -.803 -3l-5.197 -8l-1.968 3.03"></path>
    <path d="M3 3l18 18"></path>
  </svg>
);

export const OutlineDoneIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "14"}
    width={props.size || "14"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
  </svg>
);

export const OutlineHideImageIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "40"}
    width={props.size || "40"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M19 5v11.17l2 2V5c0-1.1-.9-2-2-2H5.83l2 2H19zM2.81 2.81L1.39 4.22 3 5.83V19c0 1.1.9 2 2 2h13.17l1.61 1.61 1.41-1.41L2.81 2.81zM5 19V7.83l7.07 7.07-.82 1.1L9 13l-3 4h8.17l2 2H5z"></path>
  </svg>
);

export const OutlineClockIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    height={props.size || "16"}
    width={props.size || "16"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const OutlineRestoreFromTrashIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "22"}
    width={props.size || "22"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-5V9h8v10H8v-5zm2 4h4v-4h2l-4-4-4 4h2z"></path>
  </svg>
);

export const OutlineDeleteForeverIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "22"}
    width={props.size || "22"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
  </svg>
);

export const LocationFillIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
  </svg>
);

export const ChevronRightIcon = ({ ...props }: SvgProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height={props.size || "18"}
    width={props.size || "18"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
  </svg>
);

//https://loading.io/css/
export const LoadingSpinner = () => (
  <>
    <div className="lds-dual-ring"></div>
    <style global jsx>{`
      .lds-dual-ring {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        /* margin: 8px; */
        border-radius: 50%;
        border: 2px solid hsla(0, 0%, 0%, 0.4);
        border-color: hsla(0, 0%, 0%, 0.4) transparent hsla(0, 0%, 0%, 0.4)
          transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
      html.dark .lds-dual-ring:after {
        border-radius: 50%;
        border: 2px solid white !important;
        border-color: white transparent white transparent !important;
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </>
);
