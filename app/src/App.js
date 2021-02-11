import "./App.css";
import "./components/ImagePostGallery"
import ImagePostGallery from "./components/ImagePostGallery";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
    return (
      <ErrorBoundary>
        <div className="app">
          <ImagePostGallery/>
        </div>
      </ErrorBoundary>
    );
};

export default App;
