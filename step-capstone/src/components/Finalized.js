import React from 'react';
import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import TravelObject from './TravelObject';
import TimeLine from './TimeLine';
 
export default function Finalized(props) {
    /*date2Items maps the date to the list of items of that date */
    const date2Items = new Map();
    const displayHeightOfADiv = 48.0;
    const padding = 16.0;
    const minPerDiv = 30.0;
    const [displayDate, setDisplayDate] = useState(props.startDate);

    const handleDisplayDateChange = (newDisplayDate) => {
        setDisplayDate(newDisplayDate);
    }

    /*Given 2 Date objects, return true if they have the same date; return false otherwise */
    const sameDate = (timeA, timeB) => {
        return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
    }

    /*Given a date and an item, put the item to the list of items belonging to the given date. */
    const addItemToDate = (item, dateKey) => {
        if (!date2Items.has(dateKey)) {
            date2Items.set(dateKey, [item]);
        }
        else {
            let items = date2Items.get(dateKey);
            items.push(item);
        }
    }
    /*Given a list of items (props.list), split the items into the its dates */
    const separateDates = () => {
        for(let i = 0; i < props.list.length; i++) {
            let item = props.list[i];
            let startDate = item.startDate;
            let endDate = item.endDate;
            addItemToDate(item, startDate.toDateString());
            
            if (!sameDate(startDate, endDate)) {
                addItemToDate(item, endDate.toDateString());
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
    /*Sort all lists of items in the hashMap: date2Items */
    const sortItemList = () => {
        const iterator = date2Items[Symbol.iterator]();
        for (let date2items of iterator) {
            let items = date2items[1];
            items.sort(travelObjectstartDateComparator);
        }
    }

    useEffect(() => {
        setDisplayDate(props.startDate);
    }, [props.startDate]);
    
    /*Given a startDate, return the appropriate div that the item can cling on. Refer to TimeLine.js to see all the divs. */
    const getAssociatedDiv = (startDate) => {
        if (!sameDate(displayDate, startDate)) {
            return "0:00"
        }

        let output = startDate.getHours().toString();
        if (startDate.getMinutes() < 30) {
            return output + ":00";
        }
        else {
            return output + ":30";
        }
    }
    
    /*Given startDate and endDate of a TravelObject, return the height of display (unit: pixel) */
    const getHeightPercentage = (startDate, endDate) => {
        let dif = 0;
        if (sameDate(startDate, endDate)) {
            dif = endDate.getHours()*60 + endDate.getMinutes() - startDate.getHours()*60 - startDate.getMinutes();
        
        } else if (sameDate(displayDate, startDate)) {
            dif = 24*60 - startDate.getHours()*60 - startDate.getMinutes();
            
        } else {
            dif = endDate.getHours()*60 + endDate.getMinutes();
        }
        return dif*displayHeightOfADiv/minPerDiv-padding;
    }

    /*Given a startDate of a TravelObject, return the top pixel*/
    const getTopPixel = (startDate)  => {
        let dif = (startDate.getMinutes() < 30)? startDate.getMinutes() : startDate.getMinutes() - 30;
        return dif/minPerDiv*displayHeightOfADiv;
    }

    const mountElement = () => {
        let zIndex = 1;
        if (date2Items.has(displayDate.toDateString())) {
            date2Items.get(displayDate.toDateString()).forEach((sample) => {
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
            });
        }
    }

    const unmountElement = () => {
        let minutes = [":00", ":30"];
        for(var i = 0; i < 24; i++) {
            for (var j = 0; j < 2; j++) {
                let div = i.toString() + minutes[j];
                var element =  document.getElementById(div);
                if (typeof(element) != 'undefined' && element != null) {
                    ReactDOM.unmountComponentAtNode(document.getElementById(div));
                }
               
            }
        }
    }

    useEffect(() => {
        separateDates();
        sortItemList();
        unmountElement();
        mountElement();
        
    }, [props.list, displayDate]);

    return (
        <TimeLine
            displayDate = {displayDate}
            onChangeDisplayDate = {handleDisplayDateChange}
        />
    )
}
 
 
 

