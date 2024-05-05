import React, { useEffect, useState } from 'react';
import FloorPlanViewer from './components/FloorPlanViewer';

import { FaHome, FaChevronLeft, FaChevronDown } from 'react-icons/fa';
import { RiTeamFill, RiSettingsLine } from "react-icons/ri";
import { PiCirclesThreeFill, PiBuildingOfficeFill } from "react-icons/pi";
import { LuPieChart, LuMessageSquare } from "react-icons/lu";
import { GoBrowser } from "react-icons/go";
import { BiSolidBellRing } from "react-icons/bi";

function App() {

  // Enum definitions for exterior types, floor directions, and floor types
  enum ExteriorType {
    Balcony,
    Terrace,
    Juliette,
    Flex,
    Den,
    Patio
  }
  enum CardinalDirection {
    North,
    East,
    South,
    West
  }
  enum FloorType {
    Studio,
    One_Bed_One_Bath,
    Two_Bed_One_Bath,
    Three_Bed_Two_Bath
  }

  // Image properties
  interface FloorPlanImgData {
    image: string,
    zoom: number,
    rotation: number,
    translation: number[]
  }

  const defaultFloorPlanImgData = {
    image: "",
    zoom: 1,
    rotation: 0,
    translation: [0, 0]
  }

  // Floor Plan interface
  interface FloorPlan {
    floorPlanData: FloorPlanImgData,
    name: string,
    intSize: string,
    extSize: string,
    extType: ExteriorType,
    facingDir: CardinalDirection,
    floorType: FloorType
  }

  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number>(-1);
  const [floorPlanImage, setFloorPlanImage] = useState<FloorPlanImgData>(defaultFloorPlanImgData);

  // Create a new floorplan with default values and select it
  const saveFloorPlan = (e : any) => {
    e.preventDefault();

    const updatedData = {
      floorPlanData: floorPlanImage,
      name: e.target[0].value,
      intSize: e.target[1].value,
      extSize: e.target[2].value,
      extType: e.target[3].value,
      facingDir: e.target[4].value,
      floorType: e.target[5].value,
    }

    if(selectedPlan === -1) {
      setSelectedPlan(floorPlans.length)
      setFloorPlans([...floorPlans, updatedData])
    }
    else {
      const newFloorPlans = [...floorPlans]
      newFloorPlans[selectedPlan] = updatedData;
      setFloorPlans(newFloorPlans);
    }
  }

  const [nameVal, setNameVal] = useState("");
  const [intSizeVal, setIntSizeVal] = useState("");
  const [extSizeVal, setExtSizeVal] = useState("");

  const loadFloorPlan = (i : number) => {
    setSelectedPlan(i);
    (document.getElementById("floorPlanForm") as HTMLFormElement).reset();
    if(i !== -1) {
      setFloorPlanImage(floorPlans[i].floorPlanData);
      console.log(floorPlans[i].floorPlanData)
      setNameVal(floorPlans[i].name);
      setIntSizeVal(floorPlans[i].intSize);
      setExtSizeVal(floorPlans[i].extSize);
      (document.getElementById("extType") as HTMLInputElement).value = floorPlans[i].extType.toString();
      (document.getElementById("facingDir") as HTMLInputElement).value = floorPlans[i].facingDir.toString();
      (document.getElementById("floorType") as HTMLInputElement).value = floorPlans[i].floorType.toString();
    }
    else {
      setFloorPlanImage(defaultFloorPlanImgData);
      console.log(defaultFloorPlanImgData)
      setNameVal("");
      setIntSizeVal("");
      setExtSizeVal("");
      (document.getElementById("extType") as HTMLInputElement).value = "";
      (document.getElementById("facingDir") as HTMLInputElement).value = "";
      (document.getElementById("floorType") as HTMLInputElement).value = "";
    }
  }
  
  const sidebarIcons = [
    <FaHome />,
    <RiTeamFill />,
    <PiCirclesThreeFill />,
    <PiBuildingOfficeFill />,
    <LuPieChart />,
    <LuMessageSquare />,
    <GoBrowser />,
    <RiSettingsLine />,
  ];

  const [unreadNotifications, setUnreadNotifications] = useState(true);

  // Disable scroll on main body
  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
          document.body.style.overflow = "scroll"
      };
  }, []);

  return (
    <div className='flex flex-row h-dvh overflow-hidden' onMouseMove={e=>e.preventDefault()}>
      {/* Sidebar */}
      <div className='flex flex-col items-center h-full w-[4.25dvw] bg-t_Highlight'>
        {/* Filler at top of sidebar */}
        <div className='h-[4dvh]' />
        {/* Sidebar Icons (Note: all unresponsive "buttons" in this demo could link to other pages/actions via onClick functions or being wrapped in Routing components) */}
        {
          sidebarIcons.map(function(item, i){
            return (
              <div key={i} className='flex h-[8dvh] w-[4.25dvw] items-center justify-center hover:bg-t_DarkHighlight cursor-pointer'>
                {item}
              </div>
            )
          })
        }
        
      </div>
      <main className='flex flex-col h-dvh w-full'>
        {/* Header */}
        <header className='flex flex-row h-[7dvh] items-center space-x-[2dvw] px-[1dvw]'>
          {/* Left Side */}
          <FaChevronLeft className='!text-t_Dark' />
          <p className='whitespace-nowrap'>
            <span className='text-t_Medium cursor-pointer hover:underline select-none'>Dashboards</span>
            <span className='text-t_Medium cursor-default select-none'>&emsp;/&emsp;</span>
            <span className='text-t_Dark cursor-pointer hover:underline select-none'>Floor Plans</span>
          </p>

          <div className='w-full' />
          {/* Right Side */}
          <BiSolidBellRing size="4dvh" className={`${unreadNotifications ? '!text-t_Highlight animate-pulse' : '!text-t_Dark animate-none'}`} onClick={()=>setUnreadNotifications(!unreadNotifications)} />
          <button type="button" className='flex flex-row space-x-[0.5dvw] hover:bg-t_MediumBg p-2 rounded-lg'>
            <p className='text-t_Dark cursor-pointer select-none whitespace-nowrap'>💼 Your Company</p>
            <FaChevronDown className='!text-t_Dark' />
          </button>
        </header>
        {/* Main Body */}
        <div className='bg-t_MediumBg h-full px-[2.75dvw]'>
          <h1  className='text-t_Dark text-3xl font-bold py-[2.5dvh] select-none' >Adding Floor Plans</h1>
          <div className='flex flex-row space-x-[1.375dvw] h-full'>
            <div className='flex flex-col bg-t_Light h-[75dvh] w-[20dvw] rounded-lg pl-[0.75vw] pt-[1dvh] overflow-scroll overscroll-contain'>
              {/* Open Floor Plans */}
              {
                floorPlans.map(function(plan : FloorPlan, i){
                  return (
                    <div key={i*5} className='flex flex-row'>
                      <div key={i*5+1} className='flex flex-col w-full px-[0.75dvw] py-2 rounded-lg hover:bg-t_MediumBg'  onClick={()=>loadFloorPlan(i)}>
                        <p key={i*5+2} className='text-t_Dark text-sm font-bold'>Floor Plan: {plan.name}</p>
                        <img key={i*5+3} src={plan.floorPlanData.image} className=' border-4 border-dashed border-t_Medium rounded-xl h-[8dvw]' alt='Failed to display preview.' />
                      </div>
                      {selectedPlan === i && <span key={i*5+4} className="w-1 h-full bg-t_Highlight rounded-lg"></span>}
                      {selectedPlan !== i && <span key={i*5+4} className="w-1 h-full bg-t_White"></span>}
                    </div>
                  )
                })
              }
              {/* New Floor Plan Button */}
              <div className='flex flex-row'>
                <div className='flex group flex-col w-full px-[0.75dvw] py-2 rounded-lg hover:bg-t_MediumBg' onClick={()=>loadFloorPlan(-1)}>
                  <div className='flex justify-center items-center border-4 border-dashed border-t_MediumBg group-hover:border-t_Medium rounded-xl h-[8dvw]'>
                    <p className='text-3xl text-t_Medium' >+</p>
                  </div>
                </div>
                {selectedPlan === -1 && <span className="w-1 h-full bg-t_Highlight rounded-lg"></span>}
                {selectedPlan !== -1 && <span className="w-1 h-full bg-t_White"></span>}
              </div>
            </div>
            {/* Floor Plan Adjustment Window */}
            <form id="floorPlanForm" className='flex flex-row bg-t_Light h-[75dvh] w-full rounded-lg px-[2dvw] py-[1.5dvh]' onSubmit={e=>saveFloorPlan(e)}>
              <div className='flex flex-col'>
                <h1  className='text-t_Dark text-2xl font-bold py-[1.5dvh] select-none' >Adjust Floor Plans</h1>
                <FloorPlanViewer className='h-[40dvh] w-[40dvw]' imgData={floorPlanImage} setImgData={setFloorPlanImage} />
              </div>
              <div className='flex flex-col w-full py-[4dvh] px-[2dvw]'>
                <label className='select-none my-2 text-md text-t_Dark'>Floor Name</label>
                <input type="text" id="name" className="border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" defaultValue={nameVal} required />
                <label className='select-none my-2 text-md text-t_Dark'>Interior Size</label>
                <input type="text" id="intSize" className="border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" defaultValue={intSizeVal} required />
                <label className='select-none my-2 text-md text-t_Dark'>Exterior Size</label>
                <input type="text" id="extSize" className="border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" defaultValue={extSizeVal} required />
                <label className='select-none my-2 text-md text-t_Dark'>Exterior Type (Variable)</label>
                <select id="extType" className="cursor-pointer border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" required>
                  <option value="" selected disabled hidden>Select</option>
                  {(Object.keys(ExteriorType).filter(key => isNaN(Number(key)))).map((key, i) => {
                    return <option key={i} value={key}>{key}</option>;
                  })}
                </select>
                <label className='select-none my-2 text-md text-t_Dark'>Facing Direction (Variable)</label>
                <select id="facingDir" className="cursor-pointer border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" required>
                  <option value="" selected disabled hidden>Select</option>
                  {(Object.keys(CardinalDirection).filter(key => isNaN(Number(key)))).map((key, i) => {
                    return <option key={i} value={key}>{key}</option>;
                  })}
                </select>
                <label className='select-none my-2 text-md text-t_Dark'>Select Floor Type</label>
                <select id="floorType" className="cursor-pointer border border-t_Medium text-t_Dark text-sm rounded-lg w-full p-2 focus:border-t_Highlight focus:outline-none focus:ring-0" required>
                  <option value="" selected disabled hidden>Select</option>
                  {(Object.keys(FloorType).filter(key => isNaN(Number(key)))).map((key, i) => {
                    return <option key={i} value={key}>{key.replaceAll("_", " ")}</option>;
                  })}
                </select>
                <div className='p-2' />
                <button type="submit" className='text-t_Light bg-t_Highlight hover:bg-t_DarkHighlight focus:ring-0 focus:outline-none focus:ring-t_Highlight font-bold rounded-lg text-sm p-2 text-center'>Save</button>
              </div>
            </form>
          </div>
        </div>
        {/* Footer */}
        <footer className='flex flex-row h-[7dvh] items-center space-x-[2dvw] px-[3dvw]'>
          {/* Left Side */}
          <p className='text-xs whitespace-nowrap text-t_Medium cursor-default select-none'>© 2024 (Not actually copyrighted)</p>
          
          <div className='w-full' />
          {/* Right Side */}
          <p className='text-sm whitespace-nowrap text-t_Medium cursor-pointer hover:underline select-none'>About</p>
          <p className='text-sm whitespace-nowrap text-t_Medium cursor-pointer hover:underline select-none'>Support</p>
          <p className='text-sm whitespace-nowrap text-t_Medium cursor-pointer hover:underline select-none'>Contact Us</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
