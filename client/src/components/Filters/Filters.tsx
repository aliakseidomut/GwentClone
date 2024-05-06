import './Filters.scss'
import { TbCardsFilled } from "react-icons/tb";
import { LuSword } from "react-icons/lu";
import { GiCrossbow, GiCatapult, GiBlackKnightHelm, GiMoebiusStar,  } from "react-icons/gi";
import { FaSun } from "react-icons/fa";

interface Props {
    filterType: string,
    onSetFilter: (filter: string) => void
}

export const Filters = ({filterType, onSetFilter}: Props) => {  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onSetFilter(e.target.value);
        }
    }
    
    return (
        <div className='Filters'>
            
            <label>
                <input type="radio" name={filterType} id="all" value={`all`} defaultChecked onChange={handleChange} />
                <TbCardsFilled className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="close" value={`CloseCombat`} onChange={handleChange} />
                <LuSword className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="ranged" value={`RangedCombat`} onChange={handleChange} />
                <GiCrossbow className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="siege" value={`SiegeCombat`} onChange={handleChange} />
                <GiCatapult className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="heroes" value={`Heroes`} onChange={handleChange} />
                <GiBlackKnightHelm className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="weather" value={`WeatherCard`} onChange={handleChange} />
                <FaSun className='icon' size={40} />
            </label>

            <label>
                <input type="radio" name={filterType} id="special" value={`SpecialCard`} onChange={handleChange} />
                <GiMoebiusStar className='icon' size={40} />
            </label>
        </div>
    )
}