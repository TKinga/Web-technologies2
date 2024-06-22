import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setType(data.type);
        setPrice(data.price);
        setQuantity(data.quantity);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedProduct = { name, type, price, quantity };

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Termék sikeresen módosítva!');
          setTimeout(() => {
            setLoading(false);
            navigate('/');
          }, 1500);
        } else {
          return response.text().then(errorText => {
            setMessage(`Hiba történt: ${errorText}`);
            setLoading(false);
          });
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        setMessage('Hiba történt.');
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h2 className="text-2xl font-semibold text-barbiePink dark:text-white">
              Termék módosítása
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Név <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Add meg a termék nevét"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-barbiePink active:border-barbiePink disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-barbiePink"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Típus <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-barbiePink active:border-barbiePink dark:border-form-strokedark dark:bg-form-input dark:focus:border-barbiePink text-black dark:text-white"
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Válassz egy opciót
                    </option>
                    <option value="Ruha" className="text-body dark:text-bodydark">
                      Ruha
                    </option>
                    <option value="Cipő" className="text-body dark:text-bodydark">
                      Cipő
                    </option>
                    <option value="Egyéb" className="text-body dark:text-bodydark">
                      Egyéb
                    </option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Ár <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  min={'0'}
                  placeholder="Add meg a termék árát"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-barbiePink active:border-barbiePink disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-barbiePink"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  DB <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  min={'0'}
                  placeholder="Add meg a termék darabszámát"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-barbiePink active:border-barbiePink disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-barbiePink"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <button className="flex justify-center w-full rounded bg-barbiePink p-3 font-bold text-gray hover:bg-opacity-90">
                Módosítás
              </button>
              {message && (
                <div className="mt-4 text-2xl text-center text-barbiePink dark:text-white flex items-center justify-center">
                  {message}
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 ml-3 text-barbiePink"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Edit;
