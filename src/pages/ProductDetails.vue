<script setup>
	import { ref, reactive, onBeforeMount } from "vue"

	import axios from "axios"

	import { ChevronRightIcon, ChevronLeftIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline"
	import { StarIcon, ShoppingBagIcon } from "@heroicons/vue/24/solid"

	import { useRoute } from "vue-router"
	const route = useRoute()

	const product = reactive({
		title: "",
		description: "",
		price: "",
		images: "",
	})

	const count = ref(0)

	onBeforeMount(() => {
		async function productList() {
			const url = `https://dummyjson.com/products/${route.params.id}`
			const res = await axios.get(url)
			if (200 == res.status) {
				Object.assign(product, res.data)
			}
		}
		productList()
	})
</script>
<template>
	<!-- <div>{{ product }}</div> -->
	<section id="" class="px-4 sm:px-12 py-8 sm:py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-8">
			<!-- Gallery -->
			<div class="md:space-y-3">
				<picture class="relative flex items-center bg-slate-500 rounded overflow-hidden">
					<button class="md:hidden bg-white h-8 w-8 flex items-center justify-center pr-1 rounded-full absolute left-4 z-10">
						<ChevronLeftIcon class="h-6 w-6" />
					</button>
					<img :src="product['thumbnail']" alt="sneaker" class="block h-full w-auto sm:w-full sm:h-[300px] object-cover m-auto transition duration-300" />
					<button class="md:hidden bg-white h-8 w-8 flex items-center justify-center pl-1 rounded-full absolute right-4 z-10" id="next-mobile">
						<ChevronRightIcon class="h-6 w-6" />
					</button>
				</picture>

				<div class="hidden md:flex items-center justify-center gap-1 m-auto">
					<button v-for="(image, index) in product['images']" :key="index" class="overflow-hidden w-[80px] h-[50px] cursor-pointer rounded-xl bg-rose-200 p-0.5">
						<img :src="image" alt="thumbnail" class="h-full w-full object-cover hover:opacity-50 rounded-lg" />
					</button>
				</div>
			</div>

			<!-- Text -->
			<div class="w-full space-y-4">
				<h1 class="text-dark font-bold text-xl lg:text-2xl">{{ product["title"] }}</h1>
				<p class="text-gray-500 text-base">{{ product["description"] }}</p>

				<div class="">
					<h3 class="text-dark font-bold text">Total Reviews: 34</h3>
					<div class="flex items-center gap-0.5">
						<StarIcon v-for="(icon, index) in 5" :key="index" class="h-4 w-4" />
					</div>
				</div>
				<div class="">
					<div class="flex items-center gap-4">
						<h3 class="text-dark font-bold text-xl lg:text-2xl inline-block">$125.00</h3>
						<span class="inline-block py-0.5 px-2 font-bold bg-orange-500 text-orange-100 rounded-lg text-sm">50%</span>
					</div>
					<p class="text-gray-600 line-through decoration-gray-500 decoration-1 my-auto">$250.00</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div class="overflow-hidden w-full h-10 bg-gray-100 shadow-lg flex items-center justify-between rounded-lg font-bold">
						<button @click="count--" class="px-3 h-full hover:bg-slate-300 transition-all duration-300">
							<MinusSmallIcon class="h-7 w-7" />
						</button>
						<input v-model="count" class="text-lg h-full w-full text-center focus:outline-none" />
						<button @click="count++" class="px-3 h-full hover:bg-slate-300 transition-all duration-300">
							<PlusSmallIcon class="h-7 w-7" />
						</button>
					</div>
					<button class="w-full h-10 bg-gray-100/60 flex items-center justify-center gap-4 text-xs rounded-lg font-bold shadow-lg">
						<ShoppingBagIcon class="text-rose-600 h-6 w-6" />
						Add to cart
					</button>
				</div>
			</div>
		</div>
	</section>
</template>
