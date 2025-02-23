import React, { useState } from 'react';
import Image from 'next/image';

function DesignType({ selectedDesignType }) {
    const Designs = [
        { name: "Modern", image: "/modern.jpeg" },
        { name: "Traditional", image: "/traditional.jpeg" },
        { name: "Contemporary", image: "/contemporary.jpeg" },
        { name: "Minimalist", image: "/minimalist.jpeg" },
        { name: "Bohemian", image: "/bohemian.jpeg" },
        { name: "Farmhouse", image: "/farmhouse.jpeg" }
    ];

    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className='mb-4'>
            <label className="text-slate-600 text-xl">Select Design Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {Designs.map((design, index) => (
                    <div
                        key={index}
                        className={`w-[200px] h-[200px] border rounded-lg overflow-hidden 
                        shadow-md flex flex-col items-center justify-center cursor-pointer transition-all 
                        ${selectedOption === design.name ? 'border-4 border-purple-300' : ''}`}
                        onClick={() => {
                            if (selectedOption === design.name) {
                                setSelectedOption(""); // Deselect if already selected
                                selectedDesignType(""); // Pass empty string to parent
                            } else {
                                setSelectedOption(design.name);
                                selectedDesignType(design.name);
                            }
                        }}
                    >
                        <div className="relative w-full h-[150px]">
                            <Image src={design.image} fill className="object-cover hover:scale-105 transition-all" alt={design.name} />
                        </div>
                        <p className="mt-2 text-base">{design.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DesignType;
