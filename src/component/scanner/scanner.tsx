import React, {
  useEffect, useState
} from "react";
import config from "./config.json";
import Quagga from "quagga";
import { useNavigate } from "react-router-dom";
import './scanner.css';

const Scanner = (props) => {
  const {
    onDetected
  } = props;

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectionDone, setDetectionDone] = useState(false);
  const [quaggaIsRunning, setQuaggaIsRunning] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (isCameraActive && !quaggaIsRunning) {
      console.log("J'active la caméra");
      Quagga.init(config, err => {
        setQuaggaIsRunning(true);
        if (err) {
          console.log(err, "error msg");
        }
        Quagga.start();
        return () => {
          Quagga.stop();
          setQuaggaIsRunning(false);
        };
      });
    } if (!isCameraActive && quaggaIsRunning) {
      console.warn("Je désactive la caméra");
      Quagga.stop();
      setQuaggaIsRunning(false);
    } else {
      console.warn('La caméra n est pas activé');
    }

    //boite de détection
    Quagga.onProcessed(result => {
      console.log("Recherche de code Barre");
      detectingBoxes(result);
    });

    Quagga.onDetected(detected);

  }, [isCameraActive, onDetected]);

  const detected = result => {
    console.log("Code trouvé");
    if (!detectionDone) {
      onDetected(result.codeResult.code);
      setDetectionDone(true);
      console.log("Destroy Quagga");
      Quagga.stop();
    }
  };

  const detectingBoxes = result => {
    console.log("detectingBoxes()")
    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          Number(drawingCanvas.getAttribute("width")),
          Number(drawingCanvas.getAttribute("height"))
        );
        result.boxes
          .filter(function (box) {
            return box !== result.box;
          })
          .forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, {
              x: 0,
              y: 1
            }, drawingCtx, {
              color: "green",
              lineWidth: 2
            });
          });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {
          x: 0,
          y: 1
        }, drawingCtx, {
          color: "#00F",
          lineWidth: 2
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line, {
          x: "x",
          y: "y"
        },
          drawingCtx, {
          color: "red",
          lineWidth: 3
        }
        );
      }
    }
  }

  const toggleCamera = () => {
    // Inverse l'état de la caméra lorsque le bouton est cliqué
    setIsCameraActive((prev) => !prev);
  };

  const goBack = async (event: React.MouseEvent<HTMLElement>) => {
    console.log("goBack()");
    event.preventDefault();

    console.log(event);
    Quagga.stop();
    navigate(-1);
  }

  return (
    <div>
      <div className='goBackWithName'>
        <div >
          <button onClick={goBack} className="returnToLastPage"><i className="fa-solid fa-arrow-left fa-xl"></i></button>
        </div>
      </div>
      <div className="scanner">
        <div id="interactive" className="viewport"></div>
        <div className="divActiveCam">
          <button className='btnActiveCam' onClick={toggleCamera}>
            {isCameraActive ? "Arrêter la caméra" : "Démarrer la caméra"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Scanner;