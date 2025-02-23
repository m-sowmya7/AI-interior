import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function RoomType({selectedRoomType}) {
    return (
        <div className='pb-3'>
            <label className='text-slate-600 text-xl'>Select room type *</label>
            <Select onValueChange={(value) => selectedRoomType(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Living">Living Room</SelectItem>
                    <SelectItem value="Bedroom">Bedroom</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                    <SelectItem value="Dining">Dining Room</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default RoomType
