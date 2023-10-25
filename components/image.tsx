'use client';
import Image from 'next/image';
import { FC, useState } from 'react';

interface Props {
	url: string
	alt: string
	extraClass?: string
	width?: number
	height?: number
	fill?: boolean
}

const CustomImage: FC<Props> = ({ url, alt, fill, extraClass, width, height }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{
				fill ? <Image

					src={'http://192.168.100.22:4000/' + url}
					alt={alt}
					fill
					className={` block   object-cover  duration-700 ease-in-out group-hover:opacity-75 ${extraClass} ${isLoading
						? 'scale-110 blur-2xl grayscale'
						: 'scale-100 blur-0 grayscale-0'
						}}`}
						layout='fill'
					onLoadingComplete={() => setIsLoading(false)}
				/> : <Image

					src={'http://192.168.100.22:4000/' + url}
					alt={alt}
					className={` block   object-cover  duration-700 ease-in-out group-hover:opacity-75 ${extraClass} ${isLoading
						? 'scale-110 blur-2xl grayscale'
						: 'scale-100 blur-0 grayscale-0'
						}}`}
layout='fill'
					width={width}
					height={height}
					onLoadingComplete={() => setIsLoading(false)}
				/>
			}
		</>

	);
};

export default CustomImage;