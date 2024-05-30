'use client'
import {useState, useEffect} from 'react';
import api from '../../api/api';
import Select from "react-dropdown-select";
import CustomSelect from '@/app/components/CustomSearch';

type Item = {
    title: string;
    thumbnails: string;
    duration: string;
    viewCount: string;
    channel: string;
    video_id: string;
    status: string;
    label: string;
    createdBy: string;
    labeledBy: string;
    exclude: boolean;
};
type keywordtype = {
    id:string,name:string
}
export default function Register() {
    const [keyword,
        setKeyword] = useState('');
        const [dropDown,
            setdropDown] = useState('Select');
    const [keywords,
        setKeywords] = useState < keywordtype[] > ([]);
    const [items,
        setItems] = useState < Item[] > ([]);

    useEffect(() => {
        if (keywords
            ?.length === 0) {
            const fetchKeywords = async() => {
                const response = await api.get('/api/admin/keywords/list');
                if (response.status === 200) {
                    setKeywords([{"name":"Select","id":""},...response.data]);
                } else {
                    console.error('Failed to fetch keywords');
                }
            };

            fetchKeywords();
        }
    }, []);

    const addKeyword = async() => {
        const response = await api.post('/api/admin/keywords/add', {keyword});
        if (response.status === 200) {
            setKeywords((prevKeywords : any) => [
                ...prevKeywords,
                keyword
            ]);
        } else {
            console.error('Failed to add keyword');
        }
    };

    const removeKeyword = async() => {
        const response = await api.delete(`/api/admin/keywords/remove?keyword=${dropDown}`);
        if (response.status === 200) {
            setKeywords((prevKeywords : any) => (prevKeywords || []).filter((keyword : any) => keyword.name !== dropDown));
        } else {
            console.error('Failed to remove keyword');
        }
    };

    const handleKeywordChange = async(selectedKeyword : string) => {
        setdropDown(selectedKeyword);
        const response = await api.get(`/api/admin/keywords?keyword=${selectedKeyword}`);
        setItems(response.data);
    };
    const handleKeywordType = (e : any) => {
        setKeyword(e.target.value)
    }
   return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <div>
            <form onSubmit={addKeyword} className="flex flex-col space-y-2">
                <label className="flex flex-col">
                    Keyword:
                    <input type="text" value={keyword} onChange={e =>handleKeywordType(e)} className="p-2 border border-gray-300 rounded text-emerald-600"/>
                </label>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Keyword</button>
            </form>
            <div className='mt-4'>
            <CustomSelect 
                options={keywords}
                onChange={(selectedOption) => handleKeywordChange(selectedOption)}
            />
            </div>
            <div className='justify-center'>
                <button disabled={dropDown=="Select"} onClick={() => removeKeyword()} className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">Remove Keyword</button>
            </div>
        </div>

        <table className="mt-8 w-4/5 text-center text-blue-300 border-2 border-blue-300 border-collapse mx-auto">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Channel</th>
                    <th>Duration</th>
                    <th>View Count</th>
                    <th>Status</th>
                    <th>Label</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.video_id} className="border border-blue-300">
                        <td>{item.title}</td>
                        <td>{item.channel}</td>
                        <td>{item.duration}</td>
                        <td>{item.viewCount}</td>
                        <td>{item.status}</td>
                        <td>{item.label}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}