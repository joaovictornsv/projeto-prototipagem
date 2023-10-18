namespace ProjetoPrototipagem.Services
{
    public class AuxService
    {
        public bool VerifyWeigh(double expectedWeigh, double actualWeigh)
        {
            return (actualWeigh >= expectedWeigh - (expectedWeigh * 0.05)) && (actualWeigh <= expectedWeigh * (expectedWeigh*0.05));
        }
    }
}
