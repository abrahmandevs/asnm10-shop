<script setup>
	import { ref } from "vue"
	import axios from "axios"
	import { Menu, MenuButton, MenuItems, MenuItem, Dialog, DialogPanel, TransitionRoot, TransitionChild } from "@headlessui/vue"
	// import { EditIcon } from "@heroicons/vue/24/solid"
	import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"

	const mobileMenuOpen = ref(false)
	const navBarCategorys = ref([])

	navBarCategory()
	async function navBarCategory() {
		let url = "https://dummyjson.com/products/categories"
		let res = await axios.get(url)
		if (res.status == 200) {
			navBarCategorys.value = res.data
		}
	}
</script>

<template>
	<header class="bg-white border-b mx-auto px-3 sm:px-8 md:px-12">
		<nav class="mx-auto flex max-w-7xl items-center justify-between py-2" aria-label="Global">
			<div class="grow flex items-center justify-between">
				<router-link to="/" class="-m-1.5 p-1.5 text-xl font-semibold text-black hover:text-black mr-4">LoGo</router-link>

				<div class="hidden lg:flex items-center gap-x-3">
					<router-link to="/" class="px-3 py-2 font-semibold text-black hover:text-gray-500">Home</router-link>
					<router-link to="/products" class="px-3 py-2 font-semibold text-black hover:text-gray-500">Shop</router-link>
				</div>
				<Menu as="div" class="hidden relative text-left">
					<div>
						<MenuButton class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							Options
							<ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
						</MenuButton>
					</div>
					<transition
						enter-active-class="transition duration-100 ease-out"
						enter-from-class="transform translate-x-0 opacity-0"
						enter-to-class="transform scale-100 opacity-100"
						leave-active-class="transition duration-75 ease-in"
						leave-from-class="transform scale-100 opacity-100"
						leave-to-class="transform scale-95 opacity-0"
					>
						<MenuItems class="max-h-[300px] overflow-y-scroll scroll absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div class="px-1 py-1">
								<!-- <MenuItem v-slot="{ active }" v-for="(category, index) in navBarCategorys" :key="category[index]">
									<button :class="[active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group text-left w-full rounded-md px-2 py-2 text-sm']">
										{{ category }}
									</button>
								</MenuItem> -->
							</div>
						</MenuItems>
					</transition>
				</Menu>

				<!-- mobileMenuOpen mobile sidebar -->
				<div class="flex lg:hidden">
					<button type="button" class="inline-flex items-center justify-center rounded-lgm-0.5 text-gray-700 focus:outline-none border-0 p-1.5" @click="mobileMenuOpen = true">
						<Bars3Icon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
			</div>
		</nav>
	</header>
	<TransitionRoot as="template" :show="mobileMenuOpen">
		<Dialog as="div" class="relative z-40 lg:hidden bg-blue-500" @close="mobileMenuOpen = false">
			<TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="bg-green-40 fixed inset-0 z-40 flex justify-end">
				<TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
					<DialogPanel class="w-full sm:w-3/6 relative overflow-y-auto bg-white p-8 shadow-xl">
						<div class="flex items-center justify-between">
							<a href="#" class="-m-1.5 p-1.5 text-xl font-semibold text-black hover:text-black mr-4">LoGo </a>
							<button type="button" class="-m-2.5 rounded-lgp-2.5 text-gray-700" @click="mobileMenuOpen = false">
								<XMarkIcon class="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div class="mb-3 space-y-1 mt-6">
							<router-link to="/" class="block text-sm text-gray-600 py-2 hover:text-black transition-all duration-300">Home</router-link>
							<router-link to="/products" class="block text-sm text-gray-600 py-2 hover:text-black transition-all duration-300">Shop</router-link>
							<!-- <a v-for="(category, index) in navBarCategorys" :key="index" :href="category[index]" class="block text-sm text-gray-600 py-2 hover:text-black transition-all duration-300">{{ category }}</a> -->
						</div>
					</DialogPanel>
				</TransitionChild>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<style>
	::-webkit-scrollbar {
		width: 8px; /* Adjust the width as needed */
	}

	::-webkit-scrollbar-thumb {
		background-color: #7d817e; /* Adjust the color as needed */
		border-radius: 3.375rem /* 6px */;
	}

	::-webkit-scrollbar-track {
		background-color: #5b5b5c00; /* Adjust the color as needed */
	}
</style>

