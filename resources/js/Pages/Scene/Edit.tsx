import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import TileImageSelector from '@/components2/TileImageSelector';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import TileImage from '@/components2/TileImage';

interface Props {
    scene: {
        id: number,
        name: string,
        image: string|null,
    }
}

export default function Edit({scene}: Props) {
    const [confirmingRecordScene, setConfirmingRecordScene] = useState<boolean>(false);
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, clearErrors, reset } =
        useForm({
            name: scene.name,
            image: scene.image,
        });

    const selectedImage = data.image;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('scene.update', {scene: scene.id}));
    };

    const recordScene: FormEventHandler = (e) => {
        e.preventDefault();
        closeModal();
    }

    const confirmSceneRecord = () => {
        setConfirmingRecordScene(true);
    };

    const closeModal = () => {
        setConfirmingRecordScene(false);

        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Scene List
                </h2>
            }
        >
            <Head title="Scene List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-5">
                                <section>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Scene Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Update the scene details below.
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
                                            <InputLabel htmlFor="image" value="Image" />

                                            <TileImageSelector
                                                name='image'
                                                defaultFile={data.image}
                                                onChange={(e) => setData('image', e.target.value)}
                                                />

                                            <TileImage 
                                                image={selectedImage}
                                                className='inline-block size-16 ml-10 shadow-lg shadow-slate-400 p-2 rounded-sm'
                                                />
                                            <InputError className="mt-2" message={errors.image} />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                            <SecondaryButton disabled={processing} onClick={() => {window.location.assign(route('scene.index'))}}>Back</SecondaryButton>

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
                                </section>

                                <DangerButton onClick={confirmSceneRecord} className='w-36'>
                                    Record Scene
                                </DangerButton>
                    
                                <Modal show={confirmingRecordScene} onClose={closeModal}>
                                    <form onSubmit={recordScene} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Are you sure you want to overwrite this scene?
                                        </h2>
                    
                                        <p className="mt-1 text-sm text-gray-600">
                                            The current scene will be overwritten with the current state of the matrix. 
                                            This action cannot be undone.
                                        </p>
                    
                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeModal}>
                                                Cancel
                                            </SecondaryButton>
                    
                                            <DangerButton className="ms-3" disabled={processing}>
                                                Record Scene Now
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
        
}
