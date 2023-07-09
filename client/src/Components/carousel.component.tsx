export function Carousel() {
	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='carousel w-2/3 bg-white p-4 shadow-lg'>
				<div className='flex'>
					<div className='carousel-item mr-4 w-1/4 bg-gray-100 p-4 shadow-md'>
						<h3 className='mb-2 text-xl font-bold'>Card 1</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
					</div>
					<div className='carousel-item mr-4 w-1/4 bg-gray-100 p-4 shadow-md'>
						<h3 className='mb-2 text-xl font-bold'>Card 2</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
					</div>
					<div className='carousel-item mr-4 w-1/4 bg-gray-100 p-4 shadow-md'>
						<h3 className='mb-2 text-xl font-bold'>Card 3</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
					</div>
					<div className='carousel-item w-1/4 bg-gray-100 p-4 shadow-md'>
						<h3 className='mb-2 text-xl font-bold'>Card 4</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
