import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';

export default function CreateMatrix() {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful, delete: destroy, } =
        useForm({
            ip: "",
            port: 80,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('matrix.store'));
    };

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
                            <div className="grid">
                                <section>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Matrix Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Set the Matrix connection details in the form below.
                                        </p>
                                    </header>

                                    <form onSubmit={submit} className="mt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="ip" value="IP Address" />

                                            <input
                                                id="ip"
                                                className="mt-1 block w-full"
                                                value={data.ip}
                                                onChange={(e) => setData('ip', e.target.value)}
                                                required
                                                autoComplete="ip"
                                            />

                                            <InputError className="mt-2" message={errors.ip} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="port" value="Port" />

                                            <input
                                                id="port"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.port}
                                                onChange={(e) => setData('port', parseInt(e.target.value))}
                                                required
                                                autoComplete="port"
                                            />

                                            <InputError className="mt-2" message={errors.port} />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                            <SecondaryButton disabled={processing} onClick={() => {window.location.assign(route('matrix.index'))}}>Back</SecondaryButton>

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
        
}
