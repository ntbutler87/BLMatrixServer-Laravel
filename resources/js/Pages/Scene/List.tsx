import PrimaryButton from '@/Components/PrimaryButton';
import TileImage from '@/components2/TileImage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface Props {
    scenes: Array<any>
}

export default function List({ scenes }: Props) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Scene List
                </h2>
            }
        >
            <Head title="Macro List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-5 gap-5">
                                {scenes.map( (scene) => {
                                    return (
                                        <a href={route('scene.edit', {scene: scene.id})} key={'scene' + scene.id}>
                                            <div className='flex flex-col gap-5 items-center transition ease-in-out duration-200 bg-white dark:bg-dark-800/30 rounded-lg cursor-pointer hover:bg-slate-100 hover:shadow-gray-300 hover:dark:shadow-slate-900 bw-card border border-slate-200 dark:border-dark-600/60 focus:outline-none p-8 shadow-sm shadow-slate-200/50 dark:shadow-dark-800/70'>
                                                <TileImage image={scene.image} className='max-w-20' />
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-sm'>#{scene.number}</p>
                                                    <p className='text-lg font-medium'>"{scene.name}"</p>
                                                </div>
                                            </div>
                                        </a> );
                                } )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
