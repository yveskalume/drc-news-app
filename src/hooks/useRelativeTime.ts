import { useState, useEffect } from 'react';
import {formatDistanceToNowStrict, Locale} from 'date-fns'; // Use strict for more precise intervals
import { fr } from 'date-fns/locale';

/**
 * React hook to convert a date string or Date object to a relative time string (e.g., "2 minutes ago").
 * Updates automatically.
 *
 * @param dateInput The date string, Date object, or timestamp. Can be null or undefined.
 * @param options Options for formatDistanceToNowStrict (e.g., { addSuffix: true, locale: fr }).
 * @param updateInterval The interval in milliseconds to update the relative time (default: 60000ms = 1 minute).
 * @returns A string representing the relative time, or an empty string/error message if the input is invalid.
 */
export const useRelativeTime = (
    dateInput: string | Date | number | null | undefined,
    options?: {
        addSuffix?: boolean;
        unit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
        locale?: Locale;
        roundingMethod?: 'floor' | 'ceil' | 'round';
        includeSeconds?: boolean;
    },
    updateInterval: number = 60000
): string => {
    const [relativeTime, setRelativeTime] = useState('');

    useEffect(() => {
        if (dateInput === null || dateInput === undefined) {
            setRelativeTime('');
            return;
        }

        const date = new Date(dateInput);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            setRelativeTime('Invalid Date');
            return;
        }

        const updateTime = () => {
            // Default options if none provided, ensures suffix is added
            const effectiveOptions = { addSuffix: true, ...options };

            try {
                // If using formatDistanceToNow (less strict), you might includeSeconds
                // const formattedTime = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true, ...options });
                const formattedTime = formatDistanceToNowStrict(date, effectiveOptions);
                setRelativeTime(formattedTime);
            } catch (error) {
                console.error("Error formatting relative time:", error);
                setRelativeTime(dateInput.toString()); // Handle potential errors during formatting
            }
        };

        // Initial update
        updateTime();

        // Set up interval for periodic updates
        const intervalId = setInterval(updateTime, updateInterval);

        // Clean up the interval when the component unmounts or dateInput changes
        return () => clearInterval(intervalId);

    }, [dateInput, options, updateInterval]);

    return relativeTime;
};
