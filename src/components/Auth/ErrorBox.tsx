import { AlertCircle } from 'lucide-react';



export default function ErrorBox({ message }: {message: string}) {
    return (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
                <p className="text-red-800 text-sm font-medium">
                    {message}
                </p>
            </div>
        </div>
    );
}
