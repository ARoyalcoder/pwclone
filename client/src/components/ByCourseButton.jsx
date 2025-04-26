import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi.js';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { loadRazorpayScript } from '@/utils/razorpay';



const ByCourseButton = ({ courseId }) => {

    const [createCheckoutSession, { data, isLoading, isError, error, isSuccess }] = useCreateCheckoutSessionMutation();

    const purchaseCourseHandler = async () => {
        const response = await createCheckoutSession(courseId);
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }


        const data = response?.data;

        if (!data?.orderId) {
            toast.error("Failed to create order.");
            return;
        }

        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: data.courseTitle,
            image: data.thumbnail,
            order_id: data.orderId,
            handler: function (response) {
                toast.success("Payment successful!");
                window.location.href = data.successUrl;
            },
            prefill: {
                name: "Your User Name", // Optional: Fill from auth state
                email: "user@example.com", // Optional
            },
            notes: {
                courseId,
            },
            theme: {
                color: "#6366F1",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    useEffect(() => {
        if (isSuccess && !data?.orderId) {
            toast.error("Invalid response from server.");
            console.log("Invalid response from server:", data);
        }

        if (isError) {
            toast.error(error?.data?.message || "Failed to create checkout.");
        }
    }, [data, isSuccess, isError]);


    return (
        <Button
            className="w-full"
            disabled={isLoading}
            onClick={purchaseCourseHandler}>
            {isLoading ?
                <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                </>
                : "Purchase course "}
        </Button>
    )
}

export default ByCourseButton;