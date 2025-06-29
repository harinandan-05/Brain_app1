
interface Input{
    placeholder : string;
    ref: any;
}

export function Input({placeholder, ref}:Input){
    return <input  placeholder={placeholder} ref={ref} className="px-4 py-2 border rounded m-2"/>
}