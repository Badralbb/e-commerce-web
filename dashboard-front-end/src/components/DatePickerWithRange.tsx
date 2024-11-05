"use client"
 
import * as React from "react"
import { addDays, format } from "date-fns"
 
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
 
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 type Props = {
  isDatePickerOpen: boolean,
  date: DateRange | undefined,
  setDate:(value:DateRange | undefined)=>void

 }
export function DatePickerWithRange ({
  className,
  isDatePickerOpen,
  date,
  setDate
}: React.HTMLAttributes<HTMLDivElement > & Props) {
 
  return (
<div className={cn("grid gap-2", className)}>
<Popover open={isDatePickerOpen} >
<PopoverTrigger asChild>
<div
            id="date"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
>
<div className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
<>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
</>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
<span></span>
            )}
</div>
</PopoverTrigger>
<PopoverContent className="w-auto p-0" align="start">
<Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
</PopoverContent>
</Popover>
</div>
  )
}