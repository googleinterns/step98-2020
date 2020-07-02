import React from 'react';
import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import TravelObject from './TravelObject';
import TimeLine from './TimeLine';
export default function Finalized(props) {
    const hashMap = new Map();
    let prevDiv = useRef([]);
    const [displayDate, setDisplayDate] = useState(props.startDate);

    const handleDisplayDateChange = (newDisplayDate) => {
        setDisplayDate(newDisplayDate);
    }

    const sameDate = (timeA, timeB) => {
      return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
    }
    const pushItemToArrayInHashMap = (item, dateKey) => {
        if (!hashMap.has(dateKey)) {
            hashMap.set(dateKey, [item]);
        }
        else {
            let array = hashMap.get(dateKey);
            array.push(item);
            hashMap.set(dateKey, array);
        }
    }
    const separateDates = () => {
        for(let i = 0; i < props.list.length; i++) {
            let item = props.list[i];
            let startDate = item.startDate;
            let endDate = item.endDate;
            pushItemToArrayInHashMap(item, startDate.toDateString());
            if (!sameDate(startDate, endDate)) {
                pushItemToArrayInHashMap(item, endDate.toDateString());
            }
        }
    }
    const travelObjectstartDateComparator = (travelObjectA, travelObjectB) => {
        if (travelObjectA.startDate ===  travelObjectB.startDate) {
            return 0;
        }
        else if (travelObjectA.startDate >  travelObjectB.startDate) {
            return 1;
        }
        else   {
            return -1;
        }
    }
    const sortHashMap = () => {
        const iterator = hashMap[Symbol.iterator]();
        for (let KV of iterator) {
            let V = KV[1];
            V.sort(travelObjectstartDateComparator);
        }
    }
    
    useEffect(() => {
        setDisplayDate(props.startDate);
    }, [props.startDate]);
    
    const getAssociatedDiv = (startDate) => {
        let output = startDate.getHours().toString();
        if (startDate.getMinutes() < 30) {
            return output + ":00";
        }
        else {
            return output + ":30";
        }
    }
    const getHeightPercentage = (startDate, endDate) => {
        let dif = endDate.getHours()*60 + endDate.getMinutes() - startDate.getHours()*60 - startDate.getMinutes();
        return dif*48.0/30-16;
    }
    const getTopPixel = (startDate)  => {
        let dif = (startDate.getMinutes() < 30)? startDate.getMinutes() : startDate.getMinutes() - 30;
        return dif/30.0*48;
    }
    useEffect(() => {
        separateDates();
        sortHashMap();
        let zIndex = 1;
        console.log(hashMap);
        console.log(displayDate);
        if (hashMap.has(displayDate.toDateString())) {
            
            prevDiv.current.forEach((div) => {
                ReactDOM.unmountComponentAtNode(document.getElementById(div));
            })

            let divs = []

            hashMap.get(displayDate.toDateString()).forEach((sample) => {
                let div = getAssociatedDiv(sample.startDate);
                let height = getHeightPercentage(sample.startDate, sample.endDate);
                let top = getTopPixel(sample.startDate);
                ReactDOM.render(
                    <TravelObject
                        key={sample.id}
                        data={sample}
                        onRemoveItem={props.onRemoveItem}
                        onEditItem={props.onEditItem}
                        onAddItem={props.onAddItem}
                        styleConfig={{
                            top: top.toString() + "px",
                            height: height.toString() + "px",
                            width: "228px",
                            overflowY: "scroll",
                            position: "absolute",
                            zIndex: zIndex.toString()}}

                    />,
                    document.getElementById(div)
                );
                zIndex += 1;
                divs.push(div);
            });

            prevDiv.current = divs;
            console.log("inside rendering loop prevDiv ", prevDiv.current);
        }

    })
    return (
        <TimeLine 
            displayDate = {displayDate}
            onChangeDisplayDate = {handleDisplayDateChange}
        />
    )
}
 
 
 

