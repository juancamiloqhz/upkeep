//https://loading.io/css/
export default function LoadingSpinner() {
  return (
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
}
