import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import DeleteMacroForm from './Delete';
import TileImageSelector from '@/components2/TileImageSelector';
import { useState } from 'react';
import TileImage from '@/components2/TileImage';

interface Props {
    macro: {
        id: number,
        name: string,
        slot: number|null,
        image: string|null,
        commands: string|null,
    }
}

export default function Edit({macro}: Props) {
    // const [selectedImage, setSelectedImage] = useState<string|null>(macro.image);
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: macro.name,
            slot: macro.slot,
            image: macro.image,
            commands: macro.commands,
        });
    const selectedImage = data.image;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('macro.update', {macro: macro.id}));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Macro List
                </h2>
            }
        >
            <Head title="Macro List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid">
                                <section>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Macro Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Update the macro details below.
                                        </p>
                                    </header>

                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />

                                            <input
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />

                                            <InputError className="mt-2" message={errors.name} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="slot" value="Slot" />

                                            <input
                                                id="slot"
                                                className="mt-1 block w-full"
                                                value={data.slot ?? 0}
                                                onChange={(e) => setData('slot', parseInt(e.target.value))}
                                                required
                                            />

                                            <InputError className="mt-2" message={errors.slot} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="image" value="Image" />

                                            <TileImageSelector
                                                name='image'
                                                defaultFile={data.image}
                                                onChange={(e) => {setData('image', e.target.value)}}
                                                />
                                            
                                            <TileImage 
                                                image={selectedImage}
                                                className='inline-block size-16 ml-10 shadow-lg shadow-slate-400 p-2 rounded-sm'
                                                />
                                            <InputError className="mt-2" message={errors.image} />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="commands" value="Commands" />

                                            <textarea
                                                id="commands"
                                                className="mt-1 block w-full"
                                                value={data.commands ?? ''}
                                                onChange={(e) => setData('commands', e.target.value)}
                                                autoComplete="ip"
                                            />

                                            <InputError className="mt-2" message={errors.commands} />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                            <SecondaryButton disabled={processing} onClick={() => {window.location.assign(route('macro.index'))}}>Back</SecondaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    Saved.
                                                </p>
                                            </Transition>
                                        </div>

                                    </form>
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                        <DeleteMacroForm macro={macro} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
        
}
