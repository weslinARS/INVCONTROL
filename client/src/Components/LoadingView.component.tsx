import { MutatingDots } from "react-loader-spinner";
export function LoadingView() {
	return (
		<div className=' flex h-screen w-screen flex-col items-center justify-center bg-slate-100 '>
			<MutatingDots
				height='100'
				width='100'
				color='#16161a'
				secondaryColor='#16161a'
				radius='15'
				ariaLabel='mutating-dots-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
			<h1 className='text-xl font-bold text-neutral-900'>
				Cargando Información{" "}
			</h1>
		</div>
	);
}
