import React, { useEffect, useState } from 'react';
import Slider from 'react-input-slider';


export default function FloorPlanViewer({className, imgData, setImgData} : {className: string, imgData: any, setImgData: any}) {

    // Image Path
    const [image, setImage] = useState<string>(imgData.image);

    // Zoom
    const [zoom, setZoom] = useState<number>(imgData.zoom);
    // Feel free to adjust these!
    const [minZoom, maxZoom, stepZoom] = [0.1, 5, 0.1];

    // Rotation
    const [rotation, setRotation] = useState<number>(imgData.rotation);
    // Feel free to adjust this!
    const stepRotation = 45;

    // Translation
    const [translation, setTranslation] = useState<number[]>(imgData.translation);

    // Detecting mouse presses and movement for panning
    const [mousePos, setMousePos] = useState([0, 0]);
    const [mouseDown, setMouseDown] = useState(false);
    const handleMouseDrag = (e: any) => {
        e.preventDefault()
        if(mouseDown) {
            const deltaMousePos = [e.clientX - mousePos[0], e.clientY - mousePos[1]];
            setTranslation([translation[0] + deltaMousePos[0], translation[1] + deltaMousePos[1]])
            setMousePos([e.clientX, e.clientY])
        }
    };

    // Update Floor Plan Image Data after every change
    useEffect(() => {
        setImgData({image: image, zoom: zoom, rotation: rotation, translation: translation});
    }, [image, zoom, rotation, translation, setImgData]);

    // Update the viewing window whenever we load another floor plan
    useEffect(() => {
        setImage(imgData.image);
        setZoom(imgData.zoom);
        setRotation(imgData.rotation);
        setTranslation(imgData.translation);
    }, [imgData.image, imgData.zoom, imgData.rotation, imgData.translation]);

    return (
        <div className={className}>
            <p className='text-right pb-1 text-t_Dark text-sm'>Drag the Floor Plan into the safe window</p>
            {image === "" ? 
                // File input prompt - only rendered when an image has not been uploaded
                <label className="group flex flex-col items-center justify-center w-full h-full">
                    <div className='flex flex-col w-full h-full border-2 border-t_Medium border-dashed justify-center items-center cursor-pointer bg-t_Light hover:bg-t_MediumBg'>
                        <p className="mb-2 text-sm text-t_Dark"><span className="font-semibold">Click to Browse</span> or <span className="font-semibold">Drag & Drop</span> an image file</p>
                        <p className="mb-2 text-sm text-t_Medium">(required)</p>
                    </div>
                    <input id="imagePath" type="file" className="opacity-0 h-2 select-none hover:!bg-t_Light" accept="image/*" required onChange={e => {if(e.target.files && e.target.files[0]) {setImage(URL.createObjectURL(e.target.files[0]));}}} />
                </label>
            :
                // Image rendering window - renders once the image has been uploaded
                // Currently does not support replacing the image as the demo did not seem to have that functionality.
                // To support it, simply show the <input type="file" .../> in the above JSX (by removing opacity-0 and h-2, then styling as necessary)
                // And include the same input component in this JSX (below) as well, so the browsing option can still be accessed.
                <div className="flex flex-col items-center justify-center border-2 border-t_Medium border-dashed w-full h-full">
                    <div id="imgContainer" className='relative w-full h-full justify-center items-center cursor-move overflow-hidden'
                        onMouseDown={(e)=>{setMouseDown(true); setMousePos([e.clientX, e.clientY])}}
                        onMouseUp={()=>setMouseDown(false)}
                        onMouseLeave={()=>setMouseDown(false)}
                        onMouseMove={handleMouseDrag}
                    >
                        <img
                            src={image}
                            style={{ transform: `translate(${translation[0]}px,${translation[1]}px) rotate(${rotation}deg) scale(${zoom})` }}
                            alt="Failed to load. Please report this bug with as much detail as possible under the Support tab in the bottom right."
                        />
                        {/* Overlay for "safe zone" blurring effect */}
                        <div className='absolute flex flex-col inset-0 w-full h-full'>
                            <div className='relative h-[10%] w-full bg-t_Medium/50 z-50 backdrop-blur-sm' />
                            <div className='flex flex-row h-[80%] w-full'>
                                <div className='relative h-full w-[10%] bg-t_Medium/50 z-50 backdrop-blur-sm' />
                                <div className='flex-1' />
                                <div className='relative h-full w-[10%] bg-t_Medium/50 z-50 backdrop-blur-sm' />
                            </div>
                            <div className='relative h-[10%] w-full bg-t_Medium/50 z-50 backdrop-blur-sm ' />
                        </div>
                    </div>
                </div>
            }
            {/* Controls along bottom of website */}
            <div className='flex flex-row w-full items-center justify-center'>
                <div className='flex items-center'>
                    <p className='text-t_Medium text-xl font-bold hover:text-t_Highlight select-none cursor-pointer' onClick={()=>{if(image !== "") {setZoom(1); setRotation(0); setTranslation([0, 0])}}}>⛶</p>
                </div>
                <div className='flex-1' />
                <div className='flex flex-row items-center space-x-4 float-left'>
                    <p className='text-t_Medium text-xl font-bold hover:text-t_Highlight select-none cursor-pointer' onClick={()=>{if(image !== "") {setZoom(Math.max(minZoom, zoom - stepZoom))}}}>-</p>
                    <Slider axis="x" x={zoom} onChange={({ x }) => setZoom(x)} xmin={minZoom} xmax={maxZoom} xstep={stepZoom} disabled={image === ""}
                        styles={{
                            track: {backgroundColor: '#ff4b13' },
                            active: {backgroundColor: '#ff4b13' },
                            thumb: {backgroundColor: '#ff4b13' }
                        }}
                    />
                    <p className='text-t_Medium text-xl font-bold hover:text-t_Highlight select-none cursor-pointer' onClick={()=>{if(image !== "") {setZoom(Math.min(maxZoom-stepZoom, zoom + stepZoom))}}}>+</p>
                </div>
                <div className='flex-1' />
                <div className='flex flex-row items-center space-x-1'>
                    <p className='text-t_Medium text-xl font-bold hover:text-t_Highlight select-none cursor-pointer' onClick={()=>{if(image !== "") {setRotation((rotation - stepRotation) % 360)}}}>↺</p>
                    <p className='text-t_Medium text-xl font-bold hover:text-t_Highlight select-none cursor-pointer' onClick={()=>{if(image !== "") {setRotation((rotation + stepRotation) % 360)}}}>↻</p>
                </div>
            </div>
        </div>
    )
};