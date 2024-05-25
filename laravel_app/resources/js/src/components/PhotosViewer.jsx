import React, { useState } from "react";
import { Collapse } from "antd";
import { IMAGE_TYPE_DESCRIPTION } from "../constants";
import ImageGallery from "./ImageGallery";
import { tt } from "../utils";

function PhotosViewer({
    photos,
    width = 240,
    height = 240,
    border = 5,
    color = [0, 0, 0, 0.6],
    isPublic = false,
    grouped = false,
}) {
    const [sections, setSections] = React.useState([]);

    //   photos.map((item, index) => (
    //     <div key={index} className=" w-[500px] h-[300px]  flex flex-col">
    //       <div className="flex-1 relative overflow-hidden  bg-slate-400 rounded-[3px]" />

    //       <div className="  text-center">{IMAGE_TYPE_DESCRIPTION[item.type]}</div>
    //     </div>

    //   ));
    useState(() => {
        if (photos) {
            if (grouped) {
                const images = photos.map((item, index) => (
                    <ImageGallery
                        photos={item}
                        isPublic={isPublic}
                        width={width}
                        height={height}
                        border={border}
                        color={color}
                    />
                ));
                setSections([
                    {
                        key: 1,
                        label: tt("Hình ảnh xe"),
                        children: images,
                    },
                ]);
            } else {
                const list = photos.map((item, index) => ({
                    key: index,
                    label: IMAGE_TYPE_DESCRIPTION[item.type],
                    children: (
                        <ImageGallery
                            photos={item}
                            isPublic={isPublic}
                            width={width}
                            height={height}
                            border={border}
                            color={color}
                        />
                    ),
                }));

                setSections(list);
            }
        } else {
        }
    }, [photos]);

    const onChange = (key) => {};
    return (
        <Collapse
            accordion
            size="small"
            items={sections}
            ghost
            onChange={onChange}
        />
    );
    //   return (
    //     <div className="flex flex-wrap  break-words gap-[20px] rounded-[8px] mt-[20px]">
    //       {
    //           photos.map((item, index) => (
    //             <div key={index} className=" w-[500px] h-[300px]  flex flex-col">
    //               <div className="flex-1 relative overflow-hidden  bg-slate-400 rounded-[3px]">
    //                 <ImageGallery photos={item} />
    //               </div>

    //               <div className="  text-center">{IMAGE_TYPE_DESCRIPTION[item.type]}</div>
    //             </div>
    //           ))
    //         }
    //     </div>
    //   );
}

export default PhotosViewer;
