import PrimaryButton from '@/Components/PrimaryButton';
import TileImage from '@/components2/TileImage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { CheckIcon, CogIcon, FingerPrintIcon } from '@heroicons/react/24/outline';

interface Props {
    matricies: Array<any>
}

export default function List({ matricies }: Props) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Matrix List
                </h2>
            }
        >
            <Head title="Matrix List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-4 gap-5">
                                {matricies.map( (matrix) => {
                                    return (
                                        <a href={route('matrix.edit', {matrix: matrix.id})} key={'matrix'+matrix.id}>
                                            <div className='transition grid grid-cols-1 gap-5 ease-in-out duration-200 bg-white dark:bg-dark-800/30 rounded-lg cursor-pointer hover:bg-slate-100 hover:shadow-gray-300 hover:dark:shadow-slate-900 bw-card border border-slate-200 dark:border-dark-600/60 focus:outline-none p-8 shadow-sm shadow-slate-200/50 dark:shadow-dark-800/70'>
                                                <TileImage image={"Setting"} className='max-w-20 justify-self-center'/>
                                                <div>
                                                    <div className='text-sm'><CogIcon className='mr-1 inline-block size-5' />Matrix {matrix.id}</div>
                                                    <div className='text-sm'><FingerPrintIcon className='mr-1 inline-block size-5' />IP: {matrix.ip}</div>
                                                    {matrix.selected ? 
                                                        <div className='text-lg text-green-600'><CheckIcon className='mr-1 inline-block size-5' />Active</div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </a> );
                                } )}

                            </div>
                            <div className='my-5'>
                                <PrimaryButton onClick={() => window.location.assign(route('matrix.create'))}>New Matrix</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
