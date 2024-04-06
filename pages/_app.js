import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-500">
      <Component {...pageProps}/>
    </div>
   );
}
